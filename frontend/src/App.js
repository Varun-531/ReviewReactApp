import * as React from "react";
import { useState } from "react";
import Map, { Marker, Popup } from "react-map-gl";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import StarIcon from '@mui/icons-material/Star';
import "mapbox-gl/dist/mapbox-gl.css";

function App() {
  const temp = 10;
  const [showPopup, setShowPopup] = useState(true);
  return (
    <Map
      mapboxAccessToken={process.env.REACT_APP_MAPBOX}
      initialViewState={{
        latitude: 19.076,
        longitude: 72.8777,
        zoom: temp,
      }}
      style={{ width: "100vw", height: "100vh" }}
      mapStyle="mapbox://styles/varun2222/cltax7ug500gd01qn0x60alup"
    >
      <Marker latitude={48.8584} longitude={2.2945} anchor="bottom">
        <LocationOnIcon style={{ fontSize: temp * 4, color: "darkgrey" }} />
      </Marker>
      {showPopup && (
        <Popup
          latitude={48.8584}
          longitude={2.2945}
          anchor="left"
          onClose={() => setShowPopup(false)}>
          <div className="card">
          <label>Place</label>
          <h4 className="place">Effiel Tower</h4>
          <label>Review</label>
          <p>It was beautiful</p>
          <label>Rating</label>
          <div>
          <StarIcon />
          <StarIcon />
          <StarIcon />
          <StarIcon />
          <StarIcon />
          </div>
          <label>Information</label>
          </div>
        </Popup>
      )}
    </Map>
  );
}

export default App;
