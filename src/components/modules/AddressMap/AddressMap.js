"use client";

import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

const position = [33.999, 51.46];

export default function AddressMap() {
  return (
    <MapContainer dir="ltr" center={position} zoom={13}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {/* <Marker position={position}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker> */}
    </MapContainer>
  );
}
