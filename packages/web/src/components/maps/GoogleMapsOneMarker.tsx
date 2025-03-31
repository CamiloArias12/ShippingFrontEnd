import {Marker} from '@react-google-maps/api';
import {ReactNode} from 'react';
import GoogleMaps from './GoogleMaps';

export type GoogleMapsOneMarkerProps = {
  markerLocation: any;
  onChange: (location: any) => void;
  children?: ReactNode;
  style?: React.CSSProperties;
};

export function GoogleMapsOneMarker({markerLocation, onChange, style}: GoogleMapsOneMarkerProps) {
  return (
    <div  style={style}>
      <GoogleMaps location={markerLocation} style={style}>
        <Marker
          onDragEnd={e => {
            const location: any = {lat: e.latLng?.lat()!, lng: e.latLng?.lng()!};
            onChange({lat: e.latLng?.lat()!, lng: e.latLng?.lng()!});
          }}
          draggable={true}
          position={{
            lat: markerLocation.lat,
            lng: markerLocation.lng,
          }}
        />
      </GoogleMaps>
    </div>
  );
}
