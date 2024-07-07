import { useFireabse } from "./context/Firebase";

const App = () => {
  const { name } = useFireabse()
  return (
    <p className="text-6xl">
      {name}
    </p>
  )
}

export default App;