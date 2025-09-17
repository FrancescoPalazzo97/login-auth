import { GlobalProvider } from "./contexts/GlobalContext"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import PizzasPage from "./pages/PizzasPage"
import SignUp from "./pages/SignUp"
import DefaultLayout from "./layouts/DefaultLayout"

function App() {

  return (
    <GlobalProvider>
      <BrowserRouter>
        <Routes>
          <Route Component={DefaultLayout}>
            <Route index Component={PizzasPage} />
            <Route path="/signup" Component={SignUp} />
          </Route>
        </Routes>
      </BrowserRouter>
    </GlobalProvider>
  )
}

export default App
