/* src/App.js */
import React, { useEffect, useState } from 'react'
import Amplify from 'aws-amplify'
import { fetchWorkouts, addWorkout, setWeight, removeWorkout, initialState } from './APIServices.ts'

import awsExports from "./aws-exports";
Amplify.configure(awsExports);

const App = () => {
  const [formState, setFormState] = useState(initialState)
  const [workouts, setWorkouts] = useState([])

  useEffect(() => {
    fetchWorkouts(setWorkouts)
  }, [])

  function setInput(key, value) {
    setFormState({ ...formState, [key]: value })
  }

  return (
    <div style={styles.container}>
      <h2>My Workouts</h2>
      <input
        onChange={event => setInput('name', event.target.value)}
        style={styles.input}
        value={formState.name}
        placeholder="Name"
      />
      <input
        onChange={event => setInput('description', event.target.value)}
        style={styles.input}
        value={formState.description}
        placeholder="Description"
      />
      <button style={styles.button} onClick={() => addWorkout(formState, setFormState, setWorkouts, workouts)}>Create Workout</button>
      {
        workouts.map((workout, index) => (
          <div key={workout.id ? workout.id : index} style={styles.workout}>
            <p style={styles.workoutName}>{workout.name}</p>
            <p style={styles.workoutDescription}>{workout.description}</p>
            <div>
              <label htmlFor="light">Light: </label>
              <input
                id="light"
                type="number"
                min="0"
                onChange={({ target }) => {
                  setWeight(index, "light", target.value, workouts, setWorkouts)
                }}
                style={styles.input}
                value={workouts[index].light || 0}
              />
            </div>
            <div>
              <label htmlFor="medium">Medium: </label>
              <input
                id="medium"
                type="number"
                min="0"
                onChange={({ target }) => {
                  setWeight(index, "medium", target.value, workouts, setWorkouts)
                }}
                style={styles.input}
                value={workouts[index].medium || 0}
              />
            </div>
            <div>
              <label htmlFor="heavy">Heavy: </label>
              <input
                id="heavy"
                type="number"
                min="0"
                onChange={({ target }) => {
                  setWeight(index, "heavy", target.value, workouts, setWorkouts)
                }}
                style={styles.input}
                value={workouts[index].heavy || 0}
              />
            </div>
            <button style={styles.button} onClick={() => removeWorkout(index, workouts, setWorkouts)}>Delete</button>
          </div>
        ))
      }
    </div>
  )
}

const styles = {
  container: { width: 400, margin: '0 auto', display: 'flex', flex: 1, flexDirection: 'column', justifyContent: 'center', padding: 20 },
  workout: { marginBottom: 15 },
  input: { border: 'none', backgroundColor: '#ddd', marginBottom: 10, padding: 8, fontSize: 18 },
  workoutName: { fontSize: 20, fontWeight: 'bold' },
  workoutDescription: { marginBottom: 0 },
  button: { backgroundColor: 'black', color: 'white', outline: 'none', fontSize: 18, padding: '12px 0px' }
}

export default App
