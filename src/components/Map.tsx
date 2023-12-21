import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";

const MyMap = () => {
  return (
    <div>
      <MapContainer
        style={{ width: "100vw", height: "100vh" }}
        attributionControl={false}
        center={[32.33925700144764, 72.5339985983349]}
        zoom={16}
        zoomControl={false}
        markerZoomAnimation={true}
        maxZoom={18}
        scrollWheelZoom={true}
      >
        <TileLayer
          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
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
