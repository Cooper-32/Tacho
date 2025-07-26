var speedDisplay = document.getElementById("speed");
var avgDisplay = document.getElementById("average"); // Neues Element für Durchschnitt

let startTime = Date.now();
let totalDistance = 0;
let lastPosition = null;

function toRad(deg) {
  return deg * Math.PI / 180;
}

// Haversine-Formel für Entfernung (in Metern)
function getDistance(lat1, lon1, lat2, lon2) {
  const R = 6371000; // Erdradius in Metern
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

if ("geolocation" in navigator) {
  navigator.geolocation.watchPosition(
    function (position) {
      const speed = position.coords.speed;
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      // Strecke berechnen
      if (lastPosition) {
        const dist = getDistance(
          lastPosition.lat,
          lastPosition.lon,
          lat,
          lon
        );
        totalDistance += dist;
      }

      lastPosition = { lat, lon };

      const elapsedTime = (Date.now() - startTime) / 1000; // in Sekunden
      const avgSpeed = (totalDistance / elapsedTime) * 3.6; // in km/h

      if (speed !== null) {
        const kmh = (speed * 3.6).toFixed(1);
        speedDisplay.textContent = kmh + " km/h";
        document.getElementById("distance").innerHTML="Distance: "+totalDistance;
      } else {
        speedDisplay.textContent = "Geschwindigkeit nicht verfügbar";
      }

      avgDisplay.textContent = "⌀ " + avgSpeed.toFixed(1) + " km/h";
    },
    function (error) {
      speedDisplay.textContent = "Fehler beim Standortzugriff: " + error.message;
    },
    {
      enableHighAccuracy: true
    }
  );
} else {
  speedDisplay.textContent = "GPS wird nicht unterstützt";
}
