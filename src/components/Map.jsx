import { MapContainer, TileLayer, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet.heat";
import { addressPoints } from "./data";
const MyMap = () => {
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
      </MapContainer>
    </div>
  );
};
export default MyMap;

function HeatMap() {
  const map = useMap();
  addressPoints = addressPoints.map(function (p) {
    return [p[0], p[1], [Math.random()]];
  });
  var heat = L.heatLayer(addressPoints, { radius: 25 }).addTo(map);
}
