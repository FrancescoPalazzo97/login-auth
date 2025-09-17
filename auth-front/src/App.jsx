import { BrowserRouter, Routes, Route } from "react-router-dom"
import PizzasPage from "./pages/PizzasPage"
import SignUp from "./pages/SignUp"
import Login from "./pages/Login"
import DefaultLayout from "./layouts/DefaultLayout"
import { useGlobalContext } from "./hooks/useGlobalContext"

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route Component={DefaultLayout}>
          <Route index Component={PizzasPage} />
          <Route path="/signup" Component={SignUp} />
          <Route path="/login" Component={Login} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
