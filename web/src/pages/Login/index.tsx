import React from "react"
import { Link, useNavigate } from "react-router-dom"
import { useForm, SubmitHandler } from "react-hook-form"
import { api } from "../../services/api"
import { useAuth } from "../../context/AuthProvider/useAuth"

export default function Login() {
  const navigate = useNavigate()
  const { register, handleSubmit } = useForm()
  const auth = useAuth()

  const onSubmit = handleSubmit( async (data) => { 
    try {
      const { email, password } = data
      auth.authenticate(email, password)
      if(auth.type === "INTERCAMBIST") {
        navigate("/searchFamilies")
      }
      if(auth.type === "FAMILY") {
        navigate("/home")
      }
      navigate("/searchFamilies")
    } catch (error) {
      console.log(error)
    }
  })

  return (
    <>
      <form onSubmit={onSubmit}>
        <label htmlFor="email">Email</label>
        <input type="email" {...register("email")} />
        <label htmlFor="password">Password</label>
        <input type="password" {...register("password")} />
        <button type="submit">Entrar</button>
      </form>
      <p>Ainda não tem uma conta? <Link to={"/signIn"}>Clique aqui para registrar-se</Link></p>
    </>
  )
}
