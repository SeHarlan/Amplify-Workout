
import React, { useEffect, useState } from 'react'
import Amplify from 'aws-amplify'
import { fetchWorkouts, addWorkout, setWeight, removeWorkout, initialState, formStateInterface, workoutInterface } from './APIServices'

import CSS from 'csstype';

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

  return (
    <div style={containerStyle} >
      <h2>My Workouts </h2>
      < input
        onChange={event => setInput('name', event.target.value)}
        style={inputStyle}
        value={formState.name}
        placeholder="Name"
      />
      <textarea
        onChange={event => setInput('description', event.target.value)}
        style={inputStyle}
        value={formState.description}
        placeholder="Description"
      />
      <button style={buttonStyle} onClick={() => addWorkout(formState, setFormState, setWorkouts, workouts)}> Create Workout </button>
      {
        workouts.map((workout, index) => (
          <div key={workout.id ? workout.id : index} style={workoutStyle} >
            <div style={titleContainerStyle}>
              <p style={workoutNameStyle} > {workout.name} </p>
              < button style={buttonStyle} onClick={() => removeWorkout(index, workouts, setWorkouts)}> Delete </button>
            </div>

            <p style={workoutDescriptionStyle} > {workout.description} </p>

            <div style={titleContainerStyle}>
              <div style={labelContainer}>
                <label htmlFor="light"><em>Light</em></label>
                < input
                  id="light"
                  type="number"
                  min="0"
                  onChange={({ target }) => {
                    setWeight(index, "light", parseInt(target.value), workouts, setWorkouts)
                  }}
                  style={numberInputStyle}
                  value={workouts[index].light || 0}
                />
              </div >
              < div style={labelContainer}>
                <label htmlFor="medium" ><em>Medium</em></label>
                < input
                  id="medium"
                  type="number"
                  min="0"
                  onChange={({ target }) => {
                    setWeight(index, "medium", parseInt(target.value), workouts, setWorkouts)
                  }}
                  style={numberInputStyle}
                  value={workouts[index].medium || 0}
                />
              </div>
              <div style={labelContainer}>
                <label htmlFor="heavy"><em>Heavy</em></label>
                <input
                  id="heavy"
                  type="number"
                  min="0"
                  onChange={({ target }) => {
                    setWeight(index, "heavy", parseInt(target.value), workouts, setWorkouts)
                  }}
                  style={numberInputStyle}
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


const containerStyle: CSS.Properties = { width: '300px', margin: '0 auto', display: 'flex', flex: 1, flexDirection: 'column', justifyContent: 'center', padding: "20px" };

const titleContainerStyle: CSS.Properties = { display: "flex", justifyContent: "space-between", alignItems: "center", margin: '5px' };

const labelContainer: CSS.Properties = { display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }

const workoutStyle: CSS.Properties = { marginBottom: "15px" };

const inputStyle: CSS.Properties = { border: 'none', backgroundColor: '#ddd', marginBottom: "10px", padding: "8px", fontSize: "18px" };

const workoutNameStyle: CSS.Properties = { fontSize: "20px", fontWeight: 'bold' }
const numberInputStyle: CSS.Properties = { border: 'none', backgroundColor: '#ddd', padding: "8px", fontSize: "18px", width: "2rem" };

const workoutDescriptionStyle: CSS.Properties = { marginBottom: "5px", textAlign: "center" };

const buttonStyle: CSS.Properties = { backgroundColor: 'black', color: 'white', outline: 'none', fontSize: "18px", padding: '10px 5px' }


export default App
