import { BrowserRouter, Routes, Route } from "react-router-dom"
import { ProtectedLayout } from "./components/ProtectedLayout"
import { AuthProvider } from "./context/AuthProvider"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import RegisterAddress from "./pages/RegisterAddress"
import SearchFamilies from "./pages/SearchFamilies"
import './App.css'

function App() {
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedLayout>
                  <Home />
                </ProtectedLayout>
              }
            />
            <Route
              path="/searchFamilies"
              element={
                <ProtectedLayout>
                  <SearchFamilies />
                </ProtectedLayout>
              }
            />
            <Route
              path="/registerAddress"
              element={
                <ProtectedLayout>
                  <RegisterAddress />
                </ProtectedLayout>
              }
            />

            <Route path="signIn" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </>
  )
}

export default App
