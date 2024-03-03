import * as React from "react";
import Map, { Marker } from "react-map-gl";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import 'mapbox-gl/dist/mapbox-gl.css';

function App() {
  const temp = 10;
  return (
    <Map
    mapboxAccessToken={process.env.REACT_APP_MAPBOX}
    initialViewState={{
      latitude: 19.0760,
      longitude: 72.8777,
      zoom: temp,
    }}
    style={{ width: "100vw", height: "100vh" }}
    mapStyle="mapbox://styles/varun2222/cltax7ug500gd01qn0x60alup"
  >
    <Marker latitude={48.8584} longitude={2.2945} anchor="bottom">
      <LocationOnIcon style={{fontSize: temp * 4, color:"darkgrey"}} />
    </Marker>
  </Map>
  );
}

export default App;
