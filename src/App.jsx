import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1 style={{fontSize: "3rem", fontFamily: "Bricolage Grotesque", textAlign: "center"}}>Weather App</h1>
      <h2 style={{fontSize: "2rem", fontFamily: "DM Sans", textAlign: "center"}}>Welcome to your Weather App built with React!</h2>
    </>
  )
}

export default App
