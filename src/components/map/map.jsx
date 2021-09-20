import React, {useEffect, useRef} from 'react';
import leaflet from 'leaflet';
import styles from './map.module.scss';
import 'leaflet/dist/leaflet.css';
import pin from '../../assets/img/pin.svg';
import {Cities} from '../../const';

const DefaultLocation = {
  LAT: 56.7522,
  LNG: 44,
};

const DEFAULT_ZOOM = 5;

const TILE_LAYER_URL =
  'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png';
const MAP_ATTRIBUTION =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>';

const IconSize = {
  width: 35,
  height: 40,
};

const customMarker = leaflet.icon({
  iconUrl: pin,
  iconSize: [IconSize.width, IconSize.height],
  iconAnchor: [IconSize.width / 2, IconSize.height],
});

export default function Map() {
  const mapRef = useRef();

  useEffect(() => {
    const map = leaflet.map(mapRef.current)
      .setView([DefaultLocation.LAT, DefaultLocation.LNG], DEFAULT_ZOOM);

    leaflet.tileLayer(TILE_LAYER_URL, {attribution: MAP_ATTRIBUTION}).addTo(map);

    const markers = leaflet.layerGroup();

    markers.addTo(map);

    Cities.forEach(({lat, lng}) => {
      leaflet
        .marker(
          {
            lat,
            lng,
          },
          {
            icon: customMarker,
          },
        ).addTo(markers);
    });
    return () => {
      map.remove();
    };
  }, []);

  return (
    <section className={styles.section} id="map">
      <div className={styles.container}>
        <h2 className={styles.title}>Отделения Лига Банка</h2>
        <div className={styles.map} ref={mapRef}/>
      </div>
    </section>
  );
}
