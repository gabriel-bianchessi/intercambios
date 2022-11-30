import React from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../context/AuthProvider/useAuth"
import { api }  from "../../services/api"
import { useForm, SubmitHandler } from "react-hook-form"
import { MAPBOX_ACCESS_TOKEN } from "../../consts"

export default function RegisterAddress() {
  const navigate = useNavigate()
  const { register, handleSubmit } = useForm()
  const auth = useAuth()
  const [street, setStreet] = React.useState("")
  const [number, setNumber] = React.useState("")
  const [neighborhood, setNeighborhood] = React.useState("")
  const [city, setCity] = React.useState("")

  const concatenedAddress = (street: string, number: string, neighborhood: string ,city: string) => {
    return `${street}, ${number}, ${neighborhood}, ${city}`	
  }

  function getCoordinates(address: string) {
    const response = api.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?proximity=ip&types=place%2Cpostcode%2Caddress&access_token=${MAPBOX_ACCESS_TOKEN}`)
    return response
  }

  const onSubmit = handleSubmit(async (data) => {
    const address = concatenedAddress(street, number, neighborhood, city)
    console.log(getCoordinates(address))
    // const response = await api.post("/address", {data, })
    // console.log(response)
    // navigate("/searchFamilies")
  })

  return (
    <>
      <form onSubmit={onSubmit}>
        <label htmlFor="street">Rua</label>
        <input type="text" {...register("street")} onChange={ev => setStreet(ev.currentTarget.value)}/>
        <label htmlFor="number">Número</label>
        <input type="number" {...register("number")} onChange={ev => setNumber(ev.currentTarget.value)}/>
        <label htmlFor="neighborhood">Bairro</label>
        <input type="text" {...register("neighborhood")} onChange={ev => setNeighborhood(ev.currentTarget.value)}/>
        <label htmlFor="city">Cidade</label>
        <input type="text" {...register("city")} onChange={ev => setCity(ev.currentTarget.value)}/>
        <label htmlFor="state">Estado</label>
        <input type="text" {...register("state")} />
        <label htmlFor="country">País</label>
        <input type="text" {...register("country")} />
        <label htmlFor="postalCode">CEP</label>
        <input type="text" {...register("postalCode")} />
        <button type="submit">Entrar</button>
      </form>
    </>
  )
}