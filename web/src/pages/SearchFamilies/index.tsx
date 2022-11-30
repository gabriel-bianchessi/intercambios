import React, { useRef, useEffect, useState } from "react"
import mapboxgl, { Map } from "mapbox-gl" // eslint-disable-line import/no-webpack-loader-syntax
import { MAPBOX_ACCESS_TOKEN } from "../../consts"
import { useAuth } from "../../context/AuthProvider/useAuth"

const mapStyles = {
  height: "400px",
}

export default function SearchFamilies() {
  const mapContainer = useRef<string | HTMLElement>("erro")
  const map = useRef<Map | null>(null)
  const [lng, setLng] = useState(-70.9)
  const [lat, setLat] = useState(42.35)
  const [zoom, setZoom] = useState(9)

  useEffect(() => {
    if (map.current) return // initialize map only once

    mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom: zoom,
    })
  })

  return (  
    <div>
      <div className="sidebarStyle">
        <div>
          Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
        </div>
      </div>
      <div ref={mapContainer} style={mapStyles} />
    </div>
  )
}
