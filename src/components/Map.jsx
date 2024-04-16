import {
  Marker,
  MapContainer,
  Popup,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";
import L from "leaflet";
import "leaflet.heat";
import { addressPoints } from "./data";
import axios from "axios";
import { useQuery } from "react-query";
import { useState, locationfound } from "react";

function LocationMarker() {
  const [position, setPosition] = useState(null);
  const map = useMapEvents({
    click() {
      map.locate();
    },
    locationfound(e) {
      setPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
    },
  });

  return position === null ? null : (
    <Marker position={position}>
      <Popup>You are here</Popup>
    </Marker>
  );
}

async function Fetchdata() {
  const data = await axios.get("http://127.0.0.1:8000/fetch_coordinates");
  return data;
}
const MyMap = () => {
  const { data, isSuccess } = useQuery("mydata", Fetchdata);
  console.log(data?.data);
  console.log(data);
  const marker = [
    { position: [31.93125700144764, 70.5339985983349], url: "red.png" },
    { position: [31.93225700144764, 70.5329985983349], url: "red.png" },
    { position: [31.93325700144764, 70.5319985983349], url: "red.png" },
    { position: [31.93425700144764, 70.5339985983349], url: "red.png" },
    { position: [31.93525700144764, 70.5339985983349], url: "red.png" },
    { position: [31.93625700144764, 70.5339985983349], url: "red.png" },
    { position: [31.93725700144764, 70.5369985983349], url: "blue.png" },
    { position: [31.93825700144764, 70.5379985983349], url: "blue.png" },
    { position: [31.93925700144764, 70.5389985983349], url: "blue.png" },
  ];
  return (
    <div>
      <MapContainer
        style={{ width: "100vw", height: "100vh" }}
        attributionControl={false}
        center={[30.93925700144764, 69.5339985983349]}
        zoom={12}
        zoomControl={false}
        markerZoomAnimation={true}
        scrollWheelZoom={true}
      >
        <HeatMap />
        <TileLayer
          //   url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          // maxZoom={18}
          // tileSize={256}
          // maxZoom={20}
          // maxNativeZoom={20}
        />
        {marker.map((pos) => {
          console.log(pos);
          return (
            <Marker
              key={pos.toString()}
              position={pos.position}
              icon={L.icon({ iconUrl: pos.url, iconSize: [10, 10] })}
            >
              <Popup>This is marker {pos}</Popup>
            </Marker>
          );
        })}
        {/* <LocationMarker /> */}
      </MapContainer>
    </div>
  );
};
export default MyMap;
function HeatMap() {
  const { data, isSuccess } = useQuery("mydata", Fetchdata);

  const map = useMap();
  console.log(data?.data);
  // Check if the query was successful and data is available
  if (!isSuccess) {
    // You can render an error message or return early
    return <div>Error loading data</div>;
  }

  // Assuming data.data is an array with [latitude, longitude] pairs
  const addressPoints =
    data?.data.map(function (p) {
      return [p.latitude, p.longitude, p.opacity];
    }) || [];

  var heat = L.heatLayer(addressPoints, { radius: 25 }).addTo(map);

  // You may want to return null or some other UI if the heatmap is rendered asynchronously
  return null;
}
