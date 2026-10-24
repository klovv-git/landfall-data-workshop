// Kolderveen, Drenthe — hourly wind forecast, 24 October 2026.
// Source: Open-Meteo. Data licence: CC BY 4.0.
// Requested coordinates: 52.7236, 6.1552.
// Units: km/h. Weather-model values, not local sensor readings.
//
// Exact data request:
// https://api.open-meteo.com/v1/forecast?latitude=52.7236&longitude=6.1552&hourly=wind_speed_10m&forecast_days=1&timezone=Europe%2FAmsterdam&wind_speed_unit=kmh
//
// Saved snapshot: this sketch does not fetch new data.
// Left-to-right movement is a design choice, not wind direction.

// DATA: one value per hour, starting at midnight.
const wind = [
  15.8, 25.2, 23.4, 20.2, 17.3, 34.6,
  33.5, 33.8, 30.6, 26.6, 32.0, 30.2,
  30.2, 31.3, 27.7, 28.8, 26.3, 24.5,
  25.2, 22.0, 25.6, 29.5, 33.8, 39.2
];

let particles = [];
let hourSlider;

function setup() {
  createCanvas(720, 420);
  background(12, 20, 30);

  // Choose an hour.
  hourSlider = createSlider(0, 23, 12, 1);
  hourSlider.style("width", "350px");
  hourSlider.attribute("aria-label", "Hour of the day");

  createP("Move the slider to explore the day's wind.");
  createP("Kolderveen, Drenthe • 24 October 2026");
  createP("Source: Open-Meteo • Model forecast • CC BY 4.0");

  // Start 180 particles at random positions.
  for (let i = 0; i < 180; i++) {
    particles.push({
      x: random(width),
      y: random(100, height)
    });
  }
}

function draw() {
  // Gradually fade old marks.
  background(12, 20, 30, 35);

  // READ: get the wind value for the selected hour.
  let hour = Number(hourSlider.value());
  let windSpeed = wind[hour];

  // TRANSLATE: wind controls movement and line length.
  let movement = map(windSpeed, 0, 50, 0, 10, true);
  let trailLength = map(windSpeed, 0, 50, 2, 45, true);

  // Keep movement similar across different computers.
  let timeStep = min(deltaTime / 16.67, 3);

  // DRAW: move particles from left to right.
  stroke(130, 225, 220, 170);
  strokeWeight(1.5);

  for (let p of particles) {
    p.x += movement * timeStep;

    if (p.x > width + trailLength) {
      p.x = -trailLength;
      p.y = random(100, height);
    }

    line(p.x, p.y, p.x - trailLength, p.y);
  }

  // Display the selected data.
  noStroke();
  fill(12, 20, 30);
  rect(0, 0, width, 85);

  fill(240);
  textSize(22);
  text("KOLDERVEEN / A DAY OF WIND", 22, 32);

  textSize(15);
  text(
    nf(hour, 2) + ":00  |  " + windSpeed + " km/h",
    22,
    60
  );
}
