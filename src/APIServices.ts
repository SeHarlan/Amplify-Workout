import { API, graphqlOperation } from 'aws-amplify'
import { createWorkout, updateWorkout, deleteWorkout } from './graphql/mutations'
import { listWorkouts } from './graphql/queries'

export interface workoutInterface {
  id: string,
  name: string,
  description: string,
  light: number,
  medium: number,
  heavy: number,
  editBool?: boolean
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

export interface formStateInterface {
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
        heavy,
        editBool: false
      }
    })
    setWorkouts(mungedWorkouts)
  } catch (err) { alert(`error fetching Workouts: ${err}`) }
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
    alert(`error creating workout: ${err}`)
  }
}

export async function removeWorkout(index: number, workouts: workoutInterface[], setWorkouts: Function) {
  try {
    const copyWorkouts = [...workouts]
    const [deletedWorkout] = copyWorkouts.splice(index, 1)
    setWorkouts(copyWorkouts)

    await API.graphql(graphqlOperation(deleteWorkout, { input: { id: deletedWorkout.id } }))
  } catch (err) {
    alert(`error deleting workout: ${err}`)
  }
}

type weightKey = "light" | "medium" | "heavy"

export async function setWeight(index: number, key: weightKey, weight: number, workouts: workoutInterface[], setWorkouts: Function) {
  try {
    const copyWorkouts = [...workouts]
    copyWorkouts[index][key] = weight
    setWorkouts(copyWorkouts)

    const workoutCopy: workoutInterface = {
      id: copyWorkouts[index].id,
      name: copyWorkouts[index].name,
      description: copyWorkouts[index].description,
      light: copyWorkouts[index].light,
      medium: copyWorkouts[index].medium,
      heavy: copyWorkouts[index].heavy,
    }

    await API.graphql(graphqlOperation(updateWorkout, { input: workoutCopy }))
  } catch (err) { alert(`error updating weight: ${err}`) }
}

export async function editWorkout(workout: workoutInterface) {
  const workoutCopy: workoutInterface = {
    id: workout.id,
    name: workout.name,
    description: workout.description,
    light: workout.light,
    medium: workout.medium,
    heavy: workout.heavy,
  }
  // look into why delete workout.editBool doesnt work
  try {
    await API.graphql(graphqlOperation(updateWorkout, { input: workoutCopy }))
  } catch (err) { alert(`error updating name or description: ${err}`) }
}
