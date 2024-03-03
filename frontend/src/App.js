import * as React from "react";
import { useEffect, useState } from "react";
import "./app.css";
import Map, { Marker, Popup } from "react-map-gl";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import StarIcon from "@mui/icons-material/Star";
import "mapbox-gl/dist/mapbox-gl.css";
import axios from "axios";
import {format} from "timeago.js";

function App() {
  const temp = 6;
  const [pins, setPins] = useState([{}]);
  // const [currentPlaceId, setCurrentPlaceId] = useState(null);
  const [showPopup, setShowPopup] = useState(true);
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

  // const handleMarkerClick = (id) => {
  //   setCurrentPlaceId(id);
  // };
  
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
        <React.Fragment key={p.id}>
          <Marker latitude={p.latitude} longitude={p.longitude} anchor="bottom">
            <LocationOnIcon style={{ fontSize: temp * 10, color: "tomato" }} 
              // onClick={()=>handleMarkerClick(p._id)}
            />
          </Marker>
          {
            {/* (p._id === currentPlaceId)  */}
            && showPopup && (
            <Popup
              latitude={p.latitude}
              longitude={p.longitude}
              anchor="left"
              onClose={() => setShowPopup(false)}
              key={p.id}
            >
              <div className="card">
                <label>Place</label>
                <h3 className="place">{p.title}</h3>
                <label>Review</label>
                <p className="desc">{p.description}</p>
                <label>Rating</label>
                <div className="stars">
                  <StarIcon className="star" />
                  <StarIcon className="star" />
                  <StarIcon className="star" />
                  <StarIcon className="star" />
                  <StarIcon className="star" />
                </div>
                <label>Information</label>
                <span className="username">
                  Created by <b>{p.username}</b>
                </span>
                <span className="date">
                {format(p.createdAt)}
                </span>
              </div>
            </Popup>
          )}
        </React.Fragment>
      ))}
    </Map>
  );
}

export default App;
