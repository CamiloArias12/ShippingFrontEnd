import {GoogleMap} from '@react-google-maps/api';
import {ReactNode} from 'react';

export type GoogleMapsProps = {
  location: any;
  children?: ReactNode;
  style?: React.CSSProperties;
  onLoad?: (map: google.maps.Map) => void | Promise<void>;
};

const grayMapStyle = [
  {elementType: 'geometry', stylers: [{color: '#f5f5f5'}]},
  {elementType: 'labels.text.fill', stylers: [{color: '#616161'}]},
  {elementType: 'labels.text.stroke', stylers: [{color: '#f5f5f5'}]},
  {
    featureType: 'administrative',
    elementType: 'geometry',
    stylers: [{color: '#bdbdbd'}],
  },
  {
    featureType: 'poi',
    elementType: 'geometry',
    stylers: [{color: '#eeeeee'}],
  },
  {
    featureType: 'poi',
    elementType: 'labels.text.fill',
    stylers: [{color: '#757575'}],
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [{color: '#e0e0e0'}],
  },
  {
    featureType: 'road',
    elementType: 'labels.text.fill',
    stylers: [{color: '#9e9e9e'}],
  },
  {
    featureType: 'road',
    elementType: 'labels.text.stroke',
    stylers: [{color: '#ffffff'}],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [{color: '#bdbdbd'}],
  },
  {
    featureType: 'transit',
    elementType: 'labels.icon',
    stylers: [{visibility: 'off'}],
  },
  {
    featureType: 'transit.line',
    elementType: 'geometry',
    stylers: [{color: '#9e9e9e'}],
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [{color: '#e0e0e0'}],
  },
];

export default function GoogleMaps({location, children, style, onLoad}: GoogleMapsProps) {
  const options: google.maps.MapOptions = {
    streetViewControl: false,
    mapTypeControl: false,
    styles: grayMapStyle,
  };

 
  return (
    <GoogleMap
      options={options}
      zoom={15}
      center={location}
      mapContainerStyle={style}
      onLoad={onLoad}
    >
      {children}
    </GoogleMap>
  );
}
