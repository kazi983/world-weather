import Globe from 'globe.gl';
import type { City } from '../stores/placeStore';

// Create Globe
const globeElement = document.getElementById('globe');

if (!globeElement) {
  throw new Error('Globe container not found');
}

const globe = new Globe(globeElement);

// Set globe size to match its container (the container's own CSS size
// changes with viewport width, e.g. docked to one side on wide screens).
function resizeGlobe(): void {
  const { width, height } = globeElement!.getBoundingClientRect();

  globe.width(width);
  globe.height(height);
}

resizeGlobe();

window.addEventListener('resize', resizeGlobe);

globe.globeImageUrl(
  '//unpkg.com/three-globe/example/img/earth-blue-marble.jpg',
);

globe.controls().autoRotate = true;
globe.controls().autoRotateSpeed = 0.5;

// Move to selected city
export function moveGlobe(place: City): void {
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
    .pointColor(() => '#ffffff')
    .pointRadius(0.2)
    .labelText('city')
    .labelDotRadius(0.8);
}
