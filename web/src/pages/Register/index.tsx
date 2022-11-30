
import { useAuth } from "../../context/AuthProvider/useAuth"
import { useForm, SubmitHandler } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"
import { api } from "../../services/api"

export default function Register() {
  const navigate = useNavigate()
  const { register, handleSubmit } = useForm()

  const onSubmit = handleSubmit( async (data) => {
    const response = await api.post("/auth/signIn", data)
    console.log(response)
    if(response.status === 200 && response.data.createdUser.type === "FAMILY") {
      navigate("/registerAddress")
    }    
    if (response.status === 200 && response.data.createdUser.type === "PROVIDER") {
      navigate("/searchFamilies")
    }
  }) 

  return (
    <>
      <form onSubmit={onSubmit}>
        <label htmlFor="email">Email</label>
        <input type="email" {...register("email")} />
        <label htmlFor="password">Password</label>
        <input type="password" {...register("password")} />
        <label htmlFor="birthDate">Data de nascimento</label>
        <input type="date" {...register("birthDate")} />
        <label htmlFor="name">Nome</label>
        <input type="text" {...register("name")} />
        <label htmlFor="description">Descrição</label>
        <input type="text" {...register("description")} />
        <label htmlFor="type">Tipo</label>
        <select {...register("type")}>
          <option value="INTERCAMBIST">Intercambista</option>
          <option value="FAMILY">Host Family</option>
        </select>
        <button type="submit">Entrar</button>
      </form>
      <p>Já tem uma conta? <Link to={"/login"}>Clique aqui para fazer login</Link></p>
    </>
  )
}