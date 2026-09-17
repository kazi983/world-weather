import Globe from 'globe.gl';

//Create Globe
const globe = new Globe(document.getElementById('globe')!);

globe.globeImageUrl(
  '//unpkg.com/three-globe/example/img/earth-blue-marble.jpg',
);

globe.controls().autoRotate = true;
globe.controls().autoRotateSpeed = 0.5;

//move to selected city
export function moveGlobe(place: any): void {
  // stop rotating
  globe.controls().autoRotate = false;
  // Move and zoom to selected city
  globe.pointOfView(
    {
      lat: place.lat,
      lng: place.lng,
      altitude: 0.5,
    },
    1000,
  );

  // Flight route
  // globe.arcsData([
  //   {
  //     startLat: 49.2827,
  //     startLng: -123.1207,
  //     endLat: place.lat,
  //     endLng: place.lng,
  //   },
  // ]);

  // Add marker
  globe
    .pointsData([
      {
        lat: place.lat,
        lng: place.lng,
        city: place.city,
      },
    ])
    .pointColor(() => '#ff0000')
    .pointAltitude(0.1)
    .pointRadius(0.1)
    .labelsData([
      {
        lat: place.lat,
        lng: place.lng,
        city: place.city,
      },
    ])
    .labelText('city')
    .labelSize(0.5)
    .labelDotRadius(0.5)
    .labelAltitude(0.12);
}
