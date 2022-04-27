import React from 'react';
import { MapContainer, TileLayer, GeoJSON, Marker } from "react-leaflet";
import ReactDOMServer from 'react-dom/server';

// import layerRideGeojson from '@/config/geojson/layer-ride';
import layerRideGeojson from '@/config/geojson/rasDF';
// import layerRideGeojson from '@/config/geojson/rsDF'; // regiao de Saude, Alex tinha subido no Drive

import { VacinaPopup } from './Dashboard/Vacina.popup';
import CasosPopup from './Dashboard/Popups/Casos';

import 'leaflet/dist/leaflet.css';
import { Loading } from './UI';
import { icon } from 'leaflet';
import TestagemPopup from './Dashboard/Popups/Testagem';

const markerIcon = icon({
  iconUrl: '/cims-df/marker-icon.png',
  shadowUrl: '/cims-df/marker-shadow.png',
  iconRetinaUrl: '/cims-df/marker-icon-2x.png',
});

const Popup = ({ regiao, feature, tab }: any) => {
  let render;
  switch (tab) {
    case 'vacina':
      render = <VacinaPopup data={feature} />
      break;
    case 'casos':
      render = <CasosPopup data={feature} />
      break;
    case 'testagem':
      render = <TestagemPopup data={feature} />
      break;
    case 'obito':
      render = <div>Óbito - Em desenvolvimento</div>
      break;

    default:
      break;
  }
  return (
    <div>
      <span>{regiao}</span>
      {render}
    </div>
  );
};

export default function MapBox({ active, region }: any) {
  const [loading, setLoading] = React.useState(false);
  React.useEffect(() => {
    setLoading(true);
    setTimeout(() => setLoading(false), 500)
  }, [active]);

  const ubs = Object.values(region)
    .reduce((prev, curr) => {
      const item = curr as any;
      return [
        ...prev as any[],
        ...item.ubs
      ];
    }, []) as any[];

  const onEachFeature = (feature: any, layer: any) => {
    const regionData = region[feature.properties.reg_saude];
    const popupContent = ReactDOMServer.renderToString(
      <Popup
        regiao={feature.properties.reg_saude}
        feature={regionData}
        tab={active}
      />
    );
    layer.bindPopup(popupContent);
  };

  const getColorByRegion = (feature: any) => {
    let region = feature?.properties?.reg_saude;
    let color = '#01386B';
    switch (region) {
      case 'REGIÃO LESTE': color = '#264653'; break;
      case 'REGIÃO OESTE': color = '#287271'; break;
      case 'REGIÃO NORTE': color = '#2A9D8F'; break;
      case 'REGIÃO SUL': color = '#E9C46A'; break;
      case 'REGIÃO CENTRO-SUL': color = '#F4A261'; break;
      case 'REGIÃO CENTRAL': color = '#E76F51'; break;
    }
    return {
      fillColor: color,
      weight: 1,
      opacity: 1,
      color: 'white',
      dashArray: '0',
      fillOpacity: 0.4
    }
  }

  return loading
    ? <Loading />
    : (
      <MapContainer
        center={[-15.80, -47.87]}
        zoom={10}
        scrollWheelZoom={true}
        style={{ height: '100%', width: "100%" }}>
        <TileLayer
          attribution=''
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <GeoJSON
          key={'my-map-RIDE'}
          //@ts-ignore
          data={layerRideGeojson}
          onEachFeature={onEachFeature}
          style={getColorByRegion}
        >
        </GeoJSON>
        {
          ubs.map((current: any) => (
            <Marker
              key={current.id}
              position={[
                current.latitude,
                current.longitude,
              ]}
              title={current.nome}
              icon={markerIcon}>
              <Popup>
                {current.nome}
              </Popup>
            </Marker>
          ))
        }
      </MapContainer>
    )
}
