import { useState } from 'react';
import Layout from './components/layout/Layout';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Layout>
        <h1>How's the sky looking today</h1>
      </Layout>
    </>
  )
}

export default App
