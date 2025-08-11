'use client';

import { MapContainer, TileLayer, Marker, Popup, useMapEvent} from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';
import PlaceForm from './PlaceForm';
import axios from 'axios';
import Image from 'next/image';

type PointsType = "RESTAURANTE" | "BAR" | "HOTEL"

// Mapeamento dos ícones por tipo
const iconMap: Record<PointsType, L.Icon> = {
  RESTAURANTE: new L.Icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/948/948036.png',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40],
  }),
  BAR: new L.Icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/2907/2907457.png',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40],
  }),
  HOTEL: new L.Icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/3009/3009489.png',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40],
  }),
};

type Place = {
  id: number;
  name: string;
  type: PointsType;
  phone: string;
  latitude: number;
  longitude: number;
  images: {url:string; public_id:string}[];
};


type Props = {
  setFormPosition: (position: [number,number]) => void
}

function ShowPlaceFormOnClick({setFormPosition}: Props) {
  useMapEvent("click", (e)=>{

    const position: [number, number] = [e.latlng.lat, e.latlng.lng]
     setFormPosition(position)
  })

  return null;
}

export default function Map() {

  const [formPosition, setFormPosition] = useState<[number,number] | null>(
    null
  )

  const [places, setPlaces] = useState<Place[]>([])

  useEffect(() => {
    const fetchPlaces = async () => {

      try{
        //npm i axios
        if (!process.env.NEXT_PUBLIC_API_URL) {
          throw new Error("API_URL environment variable is not defined");
        }
        const response = await axios.get<Place[]>(`${process.env.NEXT_PUBLIC_API_URL}/places`);
        setPlaces(response.data)
      }catch(err){
        console.log("Erro ao carregar os locais: ", err)
      }

    }
    fetchPlaces();
  })

  return (
    <MapContainer
      center={[-3.029350, -39.653422]}
      zoom={13}
      scrollWheelZoom={true}
      className="w-full h-[600px] rounded-lg shadow-lg"
    >
      <TileLayer
        attribution="&copy; OpenStreetMap"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <ShowPlaceFormOnClick setFormPosition={setFormPosition}/>

      {formPosition && (
        <Marker
          position={formPosition}
          icon={
            new L.Icon({
              iconUrl:"https://cdn-icons-png.flaticon.com/512/684/684908.png",
              iconSize:[40, 40],

            })
          }
        >
          <Popup>
            <PlaceForm 
            lat={formPosition[0]} 
            lng={formPosition[1]}/>
          </Popup>
        </Marker>
      )}


      {places.map((place)=>(
        <Marker
        key={place.id}
        position={[place.latitude, place.longitude]}
        icon={iconMap[place.type]}
        >
          <Popup>
            <div className='text-center'>
            {place.images?.[0] && (
              <Image
                src={place.images[0].url}
                alt={place.name}
                className='w-full h-24 object-cover rounded mb-2'
              />
            )}
              <h2 className='font-semibold mx-10'>{place.name}</h2>
              <p className='text-sm'>{place.phone}</p>
            </div>
          </Popup>


        </Marker>
      ))}
    </MapContainer>
  );
}
