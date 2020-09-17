
import React, { useEffect, useState } from 'react'
import Amplify from 'aws-amplify'
import { fetchWorkouts, addWorkout, setWeight, removeWorkout, initialState, formStateInterface, workoutInterface, editWorkout } from './APIServices'

import styles from './App.module.css'

import awsExports from "./aws-exports";
Amplify.configure(awsExports);

const initWorkouts: workoutInterface[] = []

const App = () => {
  const [formState, setFormState] = useState(initialState)
  const [workouts, setWorkouts] = useState(initWorkouts)

  useEffect(() => {
    fetchWorkouts(setWorkouts)
  }, [])

  function setInput(key: keyof formStateInterface, value: string) {
    setFormState({ ...formState, [key]: value })
  }
  function setEditInput(key: keyof formStateInterface, value: string, index: number) {
    const oldWorkouts = [...workouts]
    oldWorkouts[index][key] = value
    setWorkouts(oldWorkouts)
  }
  function handleEditBool({ target }: { target: { id: string } }) {
    const oldWorkouts = [...workouts]
    oldWorkouts[parseInt(target.id)].editBool = !oldWorkouts[parseInt(target.id)].editBool

    setWorkouts(oldWorkouts)
  }

  function handleSaveEdit(index: number) {

    editWorkout(workouts[index])
    const oldWorkouts = [...workouts]
    oldWorkouts[index].editBool = !oldWorkouts[index].editBool

    setWorkouts(oldWorkouts)
  }

  return (
    <div className={styles.container} >
      <h2>My Workouts</h2>
      < input
        onChange={event => setInput('name', event.target.value)}
        className={styles.input}
        value={formState.name}
        placeholder="Name"
      />
      <textarea
        onChange={event => setInput('description', event.target.value)}
        className={styles.input}
        value={formState.description}
        placeholder="Description"
      />
      <button className={styles.button} onClick={() => addWorkout(formState, setFormState, setWorkouts, workouts)}>Create Workout</button>
      {
        workouts.map((workout, index) => (
          <div key={workout.id ? workout.id : index} className={styles.workout} >

            {workout.editBool ? (<>
              <div className={styles.titleContainer}>
                <label htmlFor={`${index}`}>edit {workout.name}</label>
                <input type="checkbox" checked={workouts[index].editBool} onChange={handleEditBool} id={`${index}`} />
              </div>
              < input
                onChange={event => setEditInput('name', event.target.value, index)}
                className={styles.input}
                value={workouts[index].name}
                placeholder="Name"
              />
              <textarea
                onChange={event => setEditInput('description', event.target.value, index)}
                className={styles.input}
                value={workouts[index].description}
                placeholder="Description"
              />
              <div className={styles.titleContainer}>
                <button className={styles.button} onClick={() => handleSaveEdit(index)}>Save Edit</button>
                <button className={styles.button} onClick={() => removeWorkout(index, workouts, setWorkouts)}>Delete</button>
              </div>
            </>)
              : (<>
                <div className={styles.titleContainer}>
                  <p className={styles.workoutName} > {workout.name} </p>
                  <label htmlFor={`${index}`}>edit {workout.name}</label>
                  <input type="checkbox" checked={workouts[index].editBool} onChange={handleEditBool} id={`${index}`} />
                </div>

                <p className={styles.workoutDescription}>{workout.description}</p>
              </>)}

            <div className={styles.weightContainer}>
              <div className={styles.labelContainer}>
                <label htmlFor="light"><em>Light</em></label>
                <input
                  id="light"
                  type="number"
                  min="0"
                  onChange={({ target }) => {
                    setWeight(index, "light", parseInt(target.value), workouts, setWorkouts)
                  }}
                  className={styles.numberInput}
                  value={workouts[index].light || 0}
                />
              </div >
              < div className={styles.labelContainer}>
                <label htmlFor="medium" ><em>Medium</em></label>
                < input
                  id="medium"
                  type="number"
                  min="0"
                  onChange={({ target }) => {
                    setWeight(index, "medium", parseInt(target.value), workouts, setWorkouts)
                  }}
                  className={styles.numberInput}
                  value={workouts[index].medium || 0}
                />
              </div>
              <div className={styles.labelContainer}>
                <label htmlFor="heavy"><em>Heavy</em></label>
                <input
                  id="heavy"
                  type="number"
                  min="0"
                  onChange={({ target }) => {
                    setWeight(index, "heavy", parseInt(target.value), workouts, setWorkouts)
                  }}
                  className={styles.numberInput}
                  value={workouts[index].heavy || 0}
                />
              </div>
            </div>
            <hr />
          </div>
        ))
      }
    </div>
  )
}


// const containerStyle: CSS.Properties = { width: '300px', margin: '0 auto', display: 'flex', flex: 1, flexDirection: 'column', justifyContent: 'center', padding: "20px" };

// const titleContainerStyle: CSS.Properties = { display: "flex", justifyContent: "space-between", alignItems: "center", margin: '5px' };

// const labelContainer: CSS.Properties = { display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }

// const workoutStyle: CSS.Properties = { marginBottom: "15px" };

// const inputStyle: CSS.Properties = { border: 'none', backgroundColor: '#ddd', marginBottom: "10px", padding: "8px", fontSize: "18px" };

// const workoutNameStyle: CSS.Properties = { fontSize: "20px", fontWeight: 'bold' }
// const numberInputStyle: CSS.Properties = { border: 'none', backgroundColor: '#ddd', padding: "8px", fontSize: "18px", width: "2rem" };

// const workoutDescriptionStyle: CSS.Properties = { marginBottom: "5px", textAlign: "center" };

// const buttonStyle: CSS.Properties = { backgroundColor: 'black', color: 'white', outline: 'none', fontSize: "18px", padding: '10px 5px' }


export default App