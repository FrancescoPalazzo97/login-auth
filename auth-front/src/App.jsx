import { BrowserRouter, Routes, Route } from "react-router-dom"
import PizzasPage from "./pages/PizzasPage"

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route index Component={PizzasPage}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
