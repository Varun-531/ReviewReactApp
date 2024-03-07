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
  const currentUser = "Doe varun";
  const temp = 6;
  const [pins, setPins] = useState([]);
  const [newPlace, setNewPlace] = useState(null);
  const [selectedPin, setSelectedPin] = useState(null);
  const [title, setTitle] = useState(null);
  const [desc, setDesc] = useState(null);
  const [rating, setRating] = useState(0);  
  const [viewPort, setViewPort] = useState({
    latitude: 48.8584,
    longitude: 2.2945,
    zoom: temp,
    width: "100vw",
    height: "100vh",
  });

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

  const handleAddClick = (e) => {
    const { lng, lat } = e.lngLat;
    setNewPlace({
      lat: lat,
      lng: lng,
    });
  };
  const handleClick = (p) => {
    // console.log("Marker clicked:", p);
    setSelectedPin(p);
    setViewPort((prevViewport) => {
      const newViewport = {
        ...prevViewport,
        latitude: p.latitude,
        longitude: p.longitude,
      };
      // console.log("New Viewport:", newViewport);
      return newViewport;
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPin = {
      username: currentUser,
      title: title,
      description: desc,
      rating: Number(rating),
      latitude: newPlace.lat,
      longitude: newPlace.lng,
    };
  
    try {
      // Await the axios.post call to get the response
      const res = await axios.post("/pins", newPin);
  
      // Update the state with the new pin
      setPins((prevPins) => [...prevPins, res.data]);
  
      // Reset the form
      setNewPlace(null);
      setTitle(null);
      setDesc(null);
      setRating(0);
    } catch (err) {
      console.log(err);
    }
  };
  
  
  return (
    <Map
      mapboxAccessToken={process.env.REACT_APP_MAPBOX}
      initialViewState={{ ...viewPort }}
      style={{ width: "100vw", height: "100vh" }}
      mapStyle="mapbox://styles/varun2222/cltax7ug500gd01qn0x60alup"
      onDblClick={handleAddClick}
      transitionDuration="200"
    >
      {pins.map((p) => (
        <React.Fragment key={p._id}>
          <Marker
            latitude={p.latitude}
            longitude={p.longitude}
            anchor="bottom"
            // onClick={() => setSelectedPin(p)}
            onClick={() =>{
              handleClick(p);
            }}

          >
            <LocationOnIcon
              style={{
                fontSize: temp * 5,
                color: p.username === currentUser ? "tomato" : "slateblue",
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
                  {Array(p.rating).fill(<StarIcon className="star" />)}
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
      {newPlace && (
        <Popup
          latitude={newPlace.lat}
          longitude={newPlace.lng}
          anchor="left"
          onClose={() => setNewPlace(null)}
          // onOpen={() => {
          //   // Your logic when the popup is opened
          //   console.log("Popup pin:", selectedPin._id);
          // }}
        >
          <div>
            <form onSubmit={handleSubmit}>
              <label>Title</label>
              <input type="text" placeholder="Enter a title" onChange={(e)=>setTitle(e.target.value)}/>
              <label>Review</label>
              <textarea placeholder="Say us something about this place."
                onChange={(e)=>setDesc(e.target.value)}
              />
              <label>Rating</label>
              <select name="rating" id="rating" onChange={(e)=>setRating(e.target.value)} defaultValue={1}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
              <button className="submitButton" type="submit">Add Pin</button>
            </form>
          </div>
        </Popup>
      )}
    </Map>
  );
}

export default App;
