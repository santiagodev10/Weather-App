import { useState } from 'react';
import Header from './components/layout/Header/Header.jsx';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header />
      <main></main>
    </>
  )
}

export default App
