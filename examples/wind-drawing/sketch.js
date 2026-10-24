// Amsterdam hourly wind forecast, 24 October 2026.
// Source: Open-Meteo — https://open-meteo.com/
// Data attribution: CC BY 4.0. Units: km/h.
// Saved snapshot: this sketch does not fetch new data.
// Left-to-right movement is a design choice, not wind direction.

// DATA: one value for each hour, starting at midnight.
const wind = [
  18.7, 19.1, 22.7, 34.6, 36.7, 30.6,
  29.9, 29.2, 26.6, 28.4, 26.3, 27.0,
  26.3, 25.6, 23.4, 23.0, 23.8, 26.6,
  29.2, 28.8, 34.2, 36.7, 40.3, 41.0
];

let particles = [];
let hourSlider;

function setup() {
  createCanvas(720, 420);
  background(12, 20, 30);

  // A slider lets us choose an hour.
  hourSlider = createSlider(0, 23, 12, 1);
  hourSlider.style("width", "350px");
  hourSlider.attribute("aria-label", "Hour of the day");

  createP("Move the slider to explore the day's wind.");
  createP("Source: Open-Meteo • 24 October 2026 • Model forecast");

  // Start 180 particles at random positions.
  for (let i = 0; i < 180; i++) {
    particles.push({
      x: random(width),
      y: random(100, height)
    });
  }
}

function draw() {
  // A translucent background gradually fades old marks.
  background(12, 20, 30, 35);

  // READ: choose the wind value for the selected hour.
  let hour = Number(hourSlider.value());
  let windSpeed = wind[hour];

  // TRANSLATE: wind speed becomes movement and line length.
  let movement = map(windSpeed, 0, 50, 0, 10, true);
  let trailLength = map(windSpeed, 0, 50, 2, 45, true);

  // Keep movement similar on faster and slower computers.
  let timeStep = min(deltaTime / 16.67, 3);

  // DRAW: move each particle from left to right.
  stroke(130, 225, 220, 170);
  strokeWeight(1.5);

  for (let p of particles) {
    p.x += movement * timeStep;

    // Return particles to the left when they leave the screen.
    if (p.x > width + trailLength) {
      p.x = -trailLength;
      p.y = random(100, height);
    }

    line(p.x, p.y, p.x - trailLength, p.y);
  }

  // Show the actual input so we can check the connection.
  noStroke();
  fill(12, 20, 30);
  rect(0, 0, width, 85);

  fill(240);
  textSize(22);
  text("AMSTERDAM / A DAY OF WIND", 22, 32);

  textSize(15);
  text(
    nf(hour, 2) + ":00  |  " + windSpeed + " km/h",
    22,
    60
  );
}
