import * as React from "react";
import Map, { Marker } from "react-map-gl";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import 'mapbox-gl/dist/mapbox-gl.css';

function App() {
  return (
    <Map
      mapboxAccessToken={process.env.REACT_APP_MAPBOX}
      initialViewState={{
        longitude: 48.858093,
        latitude: 2.294694,
        zoom: 8,
      }}
      style={{ width: "100vw", height: "100vh" }}
      mapStyle="mapbox://styles/mapbox/streets-v9"
    >
      <Marker longitude={16.93} latitude={82.22} anchor="bottom">
        <LocationOnIcon />
      </Marker>
    </Map>
  );
}

export default App;
