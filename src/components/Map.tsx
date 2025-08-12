'use client';

import { MapContainer, TileLayer, Marker, Popup, useMapEvent, useMap} from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useState } from 'react';
import PlaceForm from './PlaceForm';

type PointsType = 'restaurant' | 'bar' | 'hotel';

// Mapeamento dos ícones por tipo
const iconMap: Record<PointsType, L.Icon> = {
  restaurant: new L.Icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/948/948036.png',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40],
  }),
  bar: new L.Icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/2907/2907457.png',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40],
  }),
  hotel: new L.Icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/3009/3009489.png',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40],
  }),
};

type Point = {
  id: number;
  name: string;
  position: [number, number];
  image: string;
  description: string;
  type: PointsType;
};

const points: Point[] = [
  {
    id: 1,
    name: 'Restaurante Saboroso',
    position: [-3.024930, -39.649836],
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description: 'Um restaurante incrível no centro.',
    type: 'restaurant',
  },
  {
    id: 2,
    name: 'Bar do Zé',
    position: [-3.024860, -39.643643],
    image: 'https://plus.unsplash.com/premium_photo-1661730134261-4381db9b5de3?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description: 'O melhor happy hour da cidade.',
    type: 'bar',
  },
  {
    id: 3,
    name: 'Hotel Confort',
    position: [-3.034040, -39.654925],
    image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description: 'Hotel confortável e bem localizado.',
    type: 'hotel',
  },
];

function ShowLatLongOnClick() {
  const map = useMap()

  useMapEvent('click',(event) => {
      const lat = event.latlng.lat
      const long = event.latlng.lng

      //Criar e exibir um Popup na posição do click
      L.popup()
      .setLatLng([lat, long])
      .setContent(
        `Você clicou em: Lat: ${lat.toFixed(2)} e Long: ${long.toFixed(2)}`
      )
      .openOn(map)
  })
  return null
}

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

      {points.map((point) => (
        <Marker
          key={point.id}
          position={point.position}
          icon={iconMap[point.type]}
        >
          <Popup>
            <div className="text-center">
              <img
                src={point.image}
                alt={point.name}
                className="w-full h-24 object-cover rounded mb-2"
              />
              <h2 className="font-semibold">{point.name}</h2>
              <p className="text-sm">{point.description}</p>
            </div>
          </Popup>
        </Marker>
      ))}

      {/* <ShowLatLongOnClick/> */}

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
            lat={parseFloat(formPosition[0].toFixed(2))} 
            lng={parseFloat(formPosition[1].toFixed(2))}/>
          </Popup>
        </Marker>
      )}

    </MapContainer>
  );
}
