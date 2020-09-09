import { API, graphqlOperation } from 'aws-amplify'
import { createWorkout, updateWorkout, deleteWorkout } from './graphql/mutations'
import { listWorkouts } from './graphql/queries'

interface workoutInterface {
  id: string,
  name: string,
  description: string,
  light: number,
  medium: number,
  heavy: number
}

interface weightsInterface {
  light: number,
  medium: number,
  heavy: number
}

interface dataInterface {
  id: string,
  name: string,
  description: string,
  light: number,
  medium: number,
  heavy: number,
  createdAt: Date,
  updatedAt: Date
}

interface formStateInterface {
  name: string,
  description: string,
}

export const initialState = {
  name: '',
  description: '',
}

export async function fetchWorkouts(setWorkouts: Function) {
  try {
    const workoutData: any = await API.graphql(graphqlOperation(listWorkouts))
    const workouts: dataInterface[] = workoutData.data.listWorkouts.items
    const mungedWorkouts = workouts.map(({
      id,
      name,
      description,
      light,
      medium,
      heavy }) => {
      return {
        id,
        name,
        description,
        light,
        medium,
        heavy
      }
    })
    setWorkouts(mungedWorkouts)
  } catch (err) { console.log('error fetching Workouts: ', err) }
}

export async function addWorkout(formState: formStateInterface, setFormState: Function, setWorkouts: Function, workouts: workoutInterface[]) {
  try {
    if (!formState.name || !formState.description) return
    const workout = {
      ...formState,
      light: 0,
      medium: 0,
      heavy: 0
    }
    setFormState(initialState)

    const { data }: any = await API.graphql(graphqlOperation(createWorkout, { input: workout }))

    const {
      id,
      name,
      description,
      light,
      medium,
      heavy
    }: workoutInterface = data.createWorkout

    const returnedWorkout = {
      id,
      name,
      description,
      light,
      medium,
      heavy
    }

    setWorkouts([...workouts, returnedWorkout])
  } catch (err) {
    console.log('error creating workout: ', err)
  }
}

export async function removeWorkout(index: number, workouts: workoutInterface[], setWorkouts: Function) {
  try {
    const copyWorkouts = [...workouts]
    const [deletedWorkout] = copyWorkouts.splice(index, 1)
    setWorkouts(copyWorkouts)

    await API.graphql(graphqlOperation(deleteWorkout, { input: { id: deletedWorkout.id } }))
  } catch (err) {
    console.log('error deleting workout: ', err)
  }
}


export async function setWeight(index: number, key: keyof weightsInterface, weight: number, workouts: workoutInterface[], setWorkouts: Function) {
  try {
    const copyWorkouts = [...workouts]
    copyWorkouts[index][key] = weight
    setWorkouts(copyWorkouts)

    await API.graphql(graphqlOperation(updateWorkout, { input: copyWorkouts[index] }))
  } catch (err) { console.log('error updating weight: ', err) }
}
