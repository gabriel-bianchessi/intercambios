import { MAPBOX_ACCESS_TOKEN } from "../consts"
import FeatureCollection from "geojson"

export const fetchLocalMapBox = async (local: string) => { 
  const request = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${local}.json?access_token=${MAPBOX_ACCESS_TOKEN}`)
  const response = await request.json()
  console.log(response)
  return response
}