import React ,{useEffect, useState} from 'react'
import styles from "./Map.module.css"
import { useNavigate, useSearchParams } from 'react-router-dom'
import { MapContainer, TileLayer, Marker, Popup , useMap, useMapEvents } from 'react-leaflet';
import {useCities} from "../contexts/CitiesContext"
import { useGeolocation } from '../hooks/useGeoLocation';
import Button from "./Button"
import { useUrlPosition } from '../hooks/useUrlPosition';
export default function Map() {
  const navigate = useNavigate();
  const { cities } = useCities();
  console.log(cities)
  const [mapPosition ,setMapPosition] = useState([40,0]);
 
  const {isLoading: isLoadingPosition , position: geoLocationPosition,
    getPosition
  } = useGeolocation();
  
  const [mapLat ,mapLng] = useUrlPosition();

  useEffect(function(){
   if( mapLat&& mapLng ) setMapPosition([mapLat,mapLng]);
  },[mapLat,mapLng]) 
  
  useEffect(function(){
    if(geoLocationPosition) 
    setMapPosition([geoLocationPosition.lat,geoLocationPosition.lng])
  },[geoLocationPosition])

  return (
    <div className={styles.mapContainer}>
      {geoLocationPosition? "null" : <Button type="position" onClick={getPosition}>
        {isLoadingPosition? 'Loading...' : 'use Your position'}
      </Button>}
      {/* <Button type="position" onClick={getPosition}>
        {isLoadingPosition? 'Loading...' : 'use Your position'}
      </Button> */}
      <MapContainer className={styles.map} 
      center={mapPosition}
      // center={[mapLat,mapLng] }

      zoom={13} scrollWheelZoom={true}>
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
    />
   {cities.map( (city) =>  
   <Marker position={[city.position.lat, city.position.lng]} key={city.id}>
      <Popup>
       <span>{city.emoji}</span><span>{city.cityName}</span>
      </Popup>
    </Marker>)}
    <ChangeCenter position={mapPosition}/>
    <DetectClick />
    {/* upar ye default values daali hai */}
  </MapContainer>
    </div>
  )
}
function ChangeCenter({position}){
  const map = useMap();
  map.setView(position);
  return null;
}
function DetectClick(){
  const navigate = useNavigate();
  useMapEvents({click : (e) => 
      navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`)
  , })

}
// url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//change above tile url to change color