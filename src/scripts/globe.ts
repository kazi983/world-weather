import Globe from 'globe.gl';

// Create Globe
const globeElement = document.getElementById('globe');

if (!globeElement) {
  throw new Error('Globe container not found');
}

const globe = new Globe(globeElement);

// Set globe size to viewport
function resizeGlobe(): void {
  globe.width(window.innerWidth);
  globe.height(window.innerHeight);
}

resizeGlobe();

window.addEventListener('resize', resizeGlobe);

globe.globeImageUrl(
  '//unpkg.com/three-globe/example/img/earth-blue-marble.jpg',
);

globe.controls().autoRotate = true;
globe.controls().autoRotateSpeed = 0.5;

// Move to selected city
export function moveGlobe(place: any): void {
  // Stop rotating
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
