import {
  Button,
  ButtonContainer,
  Container,
  Form,
  FormTitle,
  MapContainer,
  Section,
} from "./styles"

import AsyncSelect from "react-select/async"
import mapPin from "../../assets/pin.svg"
import { ChangeEvent, useState } from "react"
import Leaflet, { LatLngExpression, LeafletMouseEvent } from "leaflet"
import { TileLayer, Marker } from "react-leaflet"
import useGetLocation from "../../hooks/useGetLocation"
import { toast } from "react-toastify"
import { fetchLocalMapBox } from "../../services/apiMapBox"

const mapPinIcon = Leaflet.icon({
  iconUrl: mapPin,
  iconSize: [58, 68],
  iconAnchor: [29, 68],
  popupAnchor: [170, 2],
})
type Position = {
  longitude: number
  latitude: number
}

export default function HomePage() {
  const [address, setAddress] = useState<{
    label: string
    value: string
  } | null>(null)

  const [position, setPosition] = useState<Position | null>(null)
  const { coords } = useGetLocation()
  const [location, setLocation] = useState(coords)
  
  const [formValues, setFormValues] = useState({
    name: "",
    description: "",
    contact: "",
    category: "",
    coords: coords as LatLngExpression,
  })
  
  
  async function onSubmit() {
    console.log("juuj")
  }
  
  if (!coords) {
    return <h1>Obtendo localização ...</h1>
  }
  
  const loadOptions = async (inputValue: any, callback: any) => {
    const response = await fetchLocalMapBox(inputValue)
    let places: any = []
    if (inputValue.length < 5) return
    response.features.map((item: any) => {
      places.push({
        label: item.place_name,
        value: item.place_name,
        coords: item.center,
        place: item.place_name,
      })
    })
    
    return places
  }
  
  const handleChangeSelect = (event: any) => {
    console.log(event)
    setPosition({
      longitude: event.coords[0],
      latitude: event.coords[1],
    })
    
    setAddress({ label: event.place, value: event.place })
    console.log(event.coords[1], event.coords[0])
    let coords: LatLngExpression = [event.coords[1], event.coords[0]]
    setFormValues({ ...formValues, coords })
    setLocation(coords)
    // map.flyTo(coords, 14)
  }

  
  // let map = Leaflet.map("mapid")
  return (
    <Container>
      <Form
        onSubmit={(ev) => {
          ev.preventDefault()
          onSubmit()
        }}
        >
        <FormTitle>Onde você irá estudar?</FormTitle>

        <Section>Dados</Section>

        <AsyncSelect
          placeholder="Digite o endereço"
          classNamePrefix="filter"
          loadOptions={loadOptions}
          onChange={handleChangeSelect}
          value={address}
          />

        <Section>Endereço</Section>

        <MapContainer
          id="mapid"
          center={formValues.coords}
          zoom={13}
        >
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker
            position={
              formValues.coords
            }
          />
        </MapContainer>

        <ButtonContainer>
          <Button type="submit">Salvar</Button>
        </ButtonContainer>
      </Form>
    </Container>
  )
}
