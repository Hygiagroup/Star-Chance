# Star Chance

**Your health kit for long missions.**

Star Chance is a mobile-first web app that helps astronauts check their health every day during long space missions. It was created by **Team Hygia** (Liceo TEC Chiquimula, Guatemala) for the **NASA Space Apps Challenge 2026**, Jalapa, in response to the challenge *Create Health Monitoring Software for Astronauts on Space Missions*.

**Live app:** https://hygiagroup.github.io/Star-Chance/

## The problem

On a mission to the Moon or Mars, astronauts will be far from doctors and will have to notice changes in their own health. NASA already studies these risks, but the information is spread across many technical reports. Star Chance puts the main ones in one simple place and helps the astronaut decide when to contact the flight surgeon.

## What it does

The app is controlled with a bottom menu with five sections.

| Section | What it does |
| --- | --- |
| Home | Introduces the app and leads to the body map. |
| Body | A three-layer body map (skeletal, muscular, organs). Touch an area to see its NASA data, a short explanation, and the source. Whole-body topics (immune system, nutrition, sleep) have their own buttons. |
| Check-in | A daily check of heart rate, body temperature (in °F), blood pressure, and sleep. Each value can be typed, changed with the + and − buttons, or set by dragging the bar. The app compares it with a reference range, marks it Normal or Attention, and ends with a summary and a report for the flight surgeon. |
| Risks | Cards with six NASA spaceflight health risks, each with its data and source. |
| Sources | The list of NASA sources used by the app. |

Three simulated days (Normal, Needs attention, Urgent) can be loaded with the demo buttons to try the full flow.

## Where the data comes from

All body map and risk data comes from NASA pages, and every figure shows its source on the same screen. The rule of the team: NASA information is only included if it has a source.

The ranges used in the Check-in (heart rate, temperature, blood pressure, sleep) are **general medical references, not NASA data**, and the app labels them that way. They are for adults on Earth and are not adapted to space conditions.

## Limitations

- The app uses simulated data. It does not connect to real sensors.
- Sending the report to the flight surgeon is simulated. Nothing leaves the device.
- It does not give medical advice or diagnoses. It only compares each value with a reference range and explains the result.
- The reference ranges should be reviewed by a health professional before any use with real data.
- Not included yet: radiation, a history of measurements, and personal baselines.

## Built with

Plain HTML, CSS, and JavaScript. No build step and no framework. The body illustrations are SVG, which lets each body area be touched. GitHub Pages hosts the app.

## Run it locally

1. Download or clone this repository.
2. Open `index.html` in a web browser.

## Project structure

```
index.html    page structure
style.css     appearance
colors.css    color palette
app.js        behavior (body map, check-in, report)
content.js    all texts, data, reference ranges, and sources
img/          body layers (SVG), logos, and icons
```

All the limits and texts live in `content.js`, so they can be changed without touching the rest of the code.

## Team and use of AI

Star Chance was made by **Team Hygia**, 4to bachillerato, Liceo TEC Chiquimula. The team researched the health risks and entered the data and links manually, drew the body illustrations and body icons, created the logos of Star Chance and Team Hygia, chose the navigation bar icons and the project name, and tested the app.

AI tools were used as support: Claude (Anthropic) provided code templates that the team modified, helped fix coding errors, translate some NASA information, and review the project report.

## Acknowledgments

NASA Human Research Program, NASA Space Apps Challenge, and the Space Apps Jalapa organizers.
