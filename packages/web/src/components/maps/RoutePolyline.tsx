import { Polyline } from '@react-google-maps/api';
import { decodePolyline } from './GoogleMapsUtils';

export type RoutePolylineProps = {
  directions: any;
  options?: google.maps.PolylineOptions;
};

export default function RoutePolyline({
  directions,
  options,
  ...props
}: RoutePolylineProps) {
  const routes = directions.routes;
  if(routes && routes.length === 0) return <></>;
  const path = decodePolyline(routes[0].overview_polyline.points);

  return (
    <Polyline
      path={path}
      options={options}
      {...props}
    />
  );
}