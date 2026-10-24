# Landfall — Working with Real-World Data

A hands-on workshop exploring how data can become drawings,
animations, sound, paintings, and sculptures.

No previous experience with programming or data is needed.

## What we’ll explore

- Finding and collecting data.
- Understanding what the values represent.
- Selecting and preparing a small dataset.
- Translating values into colour, movement, marks, or physical forms.
- Using AI tools to help explain data and build small experiments.
- Discussing what our results reveal—and what they leave out.

Our workflow:

Ask → Find → Inspect → Prepare → Translate → Test → Share

## Start here: a drawing driven by wind

Our first example uses hourly wind-speed values for Kolderveen,
a village in Drenthe, Netherlands, to control moving lines in p5.js.

1. Open `examples/wind-drawing/sketch.js` in this repository.
2. Copy the code.
3. Open https://editor.p5js.org/
4. Replace the contents of `sketch.js` in the editor with the copied code.
5. Press Play.
6. Move the slider to explore different hours.

Higher wind values produce faster movement and longer lines.

The left-to-right direction is an artistic choice:
this example uses wind speed, not wind direction.

### About the data

- Provider: [Open-Meteo](https://open-meteo.com/).
- Location requested: Kolderveen, Drenthe, Netherlands.
- Requested coordinates: latitude 52.7236, longitude 6.1552.
- Date represented in the saved example: 24 October 2026.
- Variable: hourly wind speed at 10 metres above ground.
- Units: kilometres per hour.
- Timezone: Europe/Amsterdam, which also applies to Kolderveen.
- Type: weather-model forecast values, not direct local sensor readings.
- Data licence: [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).

#### The exact data request

We retrieved the data using this URL:

https://api.open-meteo.com/v1/forecast?latitude=52.7236&longitude=6.1552&hourly=wind_speed_10m&forecast_days=1&timezone=Europe%2FAmsterdam&wind_speed_unit=kmh

Open it in your browser to see the response as JSON.

Here is what each part requests:

| Parameter | Meaning |
|---|---|
| `latitude=52.7236` | Latitude of the requested location |
| `longitude=6.1552` | Longitude of the requested location |
| `hourly=wind_speed_10m` | Hourly wind speed at 10 metres above ground |
| `forecast_days=1` | One day of forecast data |
| `timezone=Europe%2FAmsterdam` | Local time in the Netherlands; `%2F` encodes `/` |
| `wind_speed_unit=kmh` | Wind speed in kilometres per hour |

The service returns data for a nearby weather-model grid point.
Its returned coordinates may differ slightly from those requested.

#### Finding the values

Inside the response:

- `hourly.time` contains the timestamps.
- `hourly.wind_speed_10m` contains the corresponding wind speeds.
- `hourly_units` identifies the units.

The first timestamp matches the first wind value, the second
timestamp matches the second value, and so on.

We copied the 24 wind-speed values into the `wind` array in
`examples/wind-drawing/sketch.js`.

#### Saved data versus current data

The sketch contains a saved snapshot for 24 October 2026.
It does not automatically retrieve new data.

The request URL asks for the current day's forecast.
Opening it later can return updated values or a different date.
It is not a permanent link to the exact snapshot used in the sketch.

The movement direction in the drawing is an artistic choice.
Only wind speed—not wind direction—controls this example.

API documentation: https://open-meteo.com/en/docs


## Try changing something

Start with one change at a time:

- Change the colour of the lines.
- Make movement more sensitive to wind speed.
- Change how quickly old marks disappear.
- Represent the same values through circles instead of lines.
- Use the values to make a drawing or cardboard sculpture by hand.

Save a working version before making another change.

## Working with an AI assistant

Explain your goal, provide the actual data, and name the tool
you are using.

For example:

“I am a beginner using the p5.js web editor.
Explain how this sketch uses wind data.
Then help me change one thing: make wind speed control
circle size instead of movement speed.
Keep the original data and explain how to test the change.”

Check that the result really uses your data.
A convincing image is not proof that the code is correct.

## Questions to keep asking

- What does one record represent?
- Where did the data come from?
- What are the units, location, and time?
- Are the values measured, predicted, or interpreted?
- What rule connects the data to the artwork?
- What information is missing?

Missing data is not the same as zero.

## Share your experiment

Work in your own p5.js sketch and save your version.

At the end, share your sketch link and explain:

- My data comes from…
- Each value represents…
- I translated the values into…
- One limitation of my experiment is…

You can view and copy this public repository without a GitHub account.
You do not need to edit this repository to participate.

## Licences and credits

Original example code in this repository is available under
the MIT License; see LICENSE.

External datasets and other third-party materials retain their
own licences. Keep their source and attribution with your work.
