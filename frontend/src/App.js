import * as React from "react";
import { useEffect, useState } from "react";
import "./app.css";
import Map, { Marker, Popup, GeolocateControl } from "react-map-gl";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import StarIcon from "@mui/icons-material/Star";
import "mapbox-gl/dist/mapbox-gl.css";
import axios from "axios";
import { format } from "timeago.js";

function App() {
  const temp = 6;
  const [pins, setPins] = useState([]);
  const [selectedPin, setSelectedPin] = useState(null);

  useEffect(() => {
    const getPins = async () => {
      try {
        const res = await axios.get("/pins");
        setPins(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getPins();
  }, []);

  return (
    <Map
      mapboxAccessToken={process.env.REACT_APP_MAPBOX}
      initialViewState={{
        latitude: 48.8584,
        longitude: 2.2945,
        zoom: temp,
      }}
      style={{ width: "100vw", height: "100vh" }}
      mapStyle="mapbox://styles/varun2222/cltax7ug500gd01qn0x60alup"
    >
      {pins.map((p) => (
        <React.Fragment key={p._id}>
          <Marker
            latitude={p.latitude}
            longitude={p.longitude}
            anchor="bottom"
            onClick={() => setSelectedPin(p)}
          >
            <LocationOnIcon
              style={{
                fontSize: temp * 5,
                color: "tomato",
                cursor: "pointer",
              }}
            />
          </Marker>

          {selectedPin && selectedPin._id === p._id && (
            <Popup
              latitude={p.latitude}
              longitude={p.longitude}
              anchor="left"
              onClose={() => setSelectedPin(null)}
              key={p._id}
              onOpen={() => {
                // Your logic when the popup is opened
                console.log("Popup pin:", selectedPin._id);
              }}
            >
              <div className="card">
                <label>Place</label>
                <h3 className="place">{p.title}</h3>
                <label>Review</label>
                <p className="desc">{p.description}</p>
                <label>Rating</label>
                <div className="stars">
                  {/* <StarIcon className="star" />
                  <StarIcon className="star" />
                  <StarIcon className="star" />
                  <StarIcon className="star" />
                  <StarIcon className="star" /> */}
                  {Array.from({ length: p.rating }, (_, index) => (
                    <StarIcon key={index} className="star" />
                  ))}
                </div>
                <label>Information</label>
                <span className="username">
                  Created by <b>{p.username}</b>
                </span>
                <span className="date">{format(p.createdAt)}</span>
              </div>
            </Popup>
          )}
        </React.Fragment>
      ))}
      <GeolocateControl />
    </Map>
  );
}

export default App;
