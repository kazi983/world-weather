**Natural correction:** “My team has three members.”

With only **5 days** and 3 people, the biggest risk is not coding difficulty; it’s **integration happening too late**. The team should optimize for having a working end-to-end app by Day 2–3, then spend the remaining time fixing, polishing, and preparing the presentation.

## 1. What to decide at today's kick-off

I’d spend the kick-off on **six decisions**, not detailed implementation.

### A. Define the MVP and component ownership

With 3 members, don't split the assignment into five isolated pieces. A good split is:

| Member                            | Main responsibility                                         | Secondary responsibility |
| --------------------------------- | ----------------------------------------------------------- | ------------------------ |
| **Member 1 — Lead / API**         | Astro setup, Weather API, geolocation, Vancouver fallback | Integration              |
| **Member 2 — Search / Favorites** | PlaceKit API (autocomplete), favorites dropdown, localStorage     | Search UI                |
| **Member 3 — Weather UI**         | Show current weather, 5-day forecast, 3-hour forecast            | Responsive UI            |

But **everyone should understand the data flow**, because the final app needs to work as one system.

The important architectural boundary:

```text
Search
   ↓
Selected City
   ↓
Weather API
   ↓
Weather Data
   ├── CurrentWeather
   ├── DailyForecast
   └── HourlyForecast
```

That should be agreed on before coding.

---

### B. Agree on the data contract

This is probably the **most important technical decision**.

Don't let each person invent their own weather-data shape.

For example, agree that the weather-fetching layer returns something conceptually like:

```ts
{
  location: {
    name: string;
    latitude: number;
    longitude: number;
  };

  current: {
    temperature: number;
    weatherCode: number;
    ...
  };

  daily: {
    date: string[];
    temperatureMax: number[];
    temperatureMin: number[];
    ...
  };

  hourly: {
    time: string[];
    temperature: number[];
    weatherCode: number[];
    ...
  };
}
```

The exact fields can be decided together.

Then the UI components don't care how Open-Meteo works internally.

```text
Open-Meteo API
      ↓
fetchWeather()
      ↓
Normalized WeatherData
      ↓
Astro components
```

This dramatically reduces merge/integration problems.

---

### C. Decide the city object

PlaceKit gives you city information, and Open-Meteo needs coordinates.

Agree on one object:

```ts
type City = {
  name: string;
  latitude: number;
  longitude: number;
};
```

Then:

```text
PlaceKit
   ↓
City
   ↓
Open-Meteo
```

Favorites should store this same structure in `localStorage`.

Don't store only `"Vancouver"` and then have to geocode it again later.

---

### D. Decide the state/data flow

Before writing components, answer:

> **Who owns the currently selected city and weather data?**

For a small Astro app, keep this relatively simple.

For example:

```text
App
 ├── selectedCity
 ├── weatherData
 │
 ├── Search
 ├── Favorites
 ├── CurrentWeather
 ├── DailyForecast
 └── HourlyForecast
```

You don't need React-style state management for this assignment.

The team should specifically agree on **where client-side JavaScript is needed** and avoid unnecessary DOM manipulation.

---

### E. Agree on Git rules

Since three people will be working simultaneously:

```text
main
 └── feature branches
      ├── feature/search-favorites - Miu
      ├── feature/geolocation      - Kazi
      ├── feature/weather-data     - Kazi
      └── feature/weather-ui       -
```

Agree on:

* Never work directly on `main`
* Pull/rebase before starting work
* Small commits
* Descriptive Conventional Commits
* PR/merge into `main`
* Don't modify another person's component without communicating
* Resolve conflicts together rather than blindly accepting one side

Also agree on naming **before** everyone creates files.

For example:

```text
src/components/
  Search.astro
  Favorites.astro
  CurrentWeather.astro
  DailyForecast.astro
  HourlyForecast.astro

src/lib/
  weather.ts
  places.ts

src/styles/
  _variables.scss
  _mixins.scss
  global.scss
```

You don't have to use exactly this structure, but agree on one.

---

### F. Make a "definition of done"

For this assignment, I'd make the checklist brutally concrete:

* [ ] Astro app runs
* [ ] Default location works
* [ ] Vancouver fallback works
* [ ] City search works
* [ ] Selecting city loads weather
* [ ] Current weather works
* [ ] 5-day forecast works
* [ ] Clicking a day changes 3-hour forecast
* [ ] Favorites work
* [ ] Favorites survive reload
* [ ] Mobile 375px works
* [ ] Desktop 1440px works
* [ ] Error/loading states exist
* [ ] Deployed
* [ ] README has live URL
* [ ] Presentation ready

This becomes your team's **real project board**.

---

# 2. Five-day milestone plan

The key rule:

> **Do not spend Day 1–2 making things beautiful. Get the entire data flow working first.**

## Day 1 — Foundation + API proof

### Goal

**Everybody can run the project, and the core APIs are understood.**

### Member 1

* Scaffold Astro
* Set up Git branches
* Create basic project structure
* Create shared SCSS variables
* Implement/test geolocation
* Implement Vancouver fallback
* Start weather API utility

### Member 2

* Investigate PlaceKit API
* Build search/autocomplete
* Determine exact response → `City` mapping
* Start favorites/localStorage

### Member 3

* Investigate Open-Meteo response
* Build weather-data types
* Design Current/Daily/Hourly component interfaces
* Create rough UI components using mock data

### Team checkpoint

By the end of Day 1:

```text
User location
     ↓
City { name, lat, lng }
     ↓
Open-Meteo
     ↓
WeatherData
```

should be proven to work.

**Don't aim for finished UI.**

---

# Day 2 — Vertical slice

### Goal

**A user can search/select a city and see actual weather.**

This is your most important day.

### Member 1

* Finish `fetchWeather()`
* Finish geolocation/fallback
* Connect selected city → weather fetching
* Handle loading/error states

### Member 2

* Finish autocomplete
* Finish favorite add/remove
* Finish localStorage persistence
* Connect favorite selection → selected city

### Member 3

* Finish CurrentWeather
* Finish DailyForecast
* Start HourlyForecast
* Use real API data instead of mock data

### Team integration

At the end of Day 2, ideally:

```text
Search Vancouver
      ↓
Select Vancouver
      ↓
Fetch Open-Meteo
      ↓
┌─────────────────────┐
│ Current Weather     │
│                     │
│ 5-Day Forecast      │
│                     │
│ 3-Hour Forecast     │
└─────────────────────┘
```

Even if it looks ugly.

**If this doesn't work by the end of Day 2, stop adding features and integrate.**

---

# Day 3 — Complete functionality

### Goal

**All mandatory requirements work.**

Focus on functionality rather than visual polish.

### Member 1

* Integration/debugging
* API error handling
* Geolocation edge cases
* Check API/network failures

### Member 2

* Finish favorites UX
* Verify reload persistence
* Verify selecting favorites changes weather
* Search edge cases

### Member 3

* Finish 3-hour forecast
* Implement daily-card → hourly-data interaction
* Weather icons/labels
* Verify 5 days and 3-hour intervals

### Team testing

Test the actual requirements one by one.

Especially:

```text
Open app
 ↓
Allow location
 ↓
Weather appears

Open app
 ↓
Deny location
 ↓
Vancouver appears

Search another city
 ↓
Select it
 ↓
Weather changes

Click star
 ↓
City appears in favorites

Reload
 ↓
Favorite still exists

Click Day 3
 ↓
3-hour forecast changes to Day 3
```

By the end of Day 3:

> **Feature-complete MVP.**

No major functionality should still be "almost done."

---

# Day 4 — Desktop + mobile polish

### Goal

**Make the MVP look like a finished product.**

Start with desktop:

```text
1440px
```

Then mobile:

```text
375px
```

Don't create two completely different designs.

Use the same structure and adjust:

* layout
* spacing
* font sizes
* card widths
* horizontal scrolling where appropriate
* navigation/dropdown positioning
* forecast layout

### Team responsibilities

Divide the screen rather than assigning completely separate features.

For example:

* Member 1 → overall layout + integration
* Member 2 → search/favorites styling
* Member 3 → weather/forecast styling

Then **review each other's work**.

Also check:

* loading state
* empty state
* API error
* long city names
* unusual weather values
* small screens
* touch targets
* keyboard usability

---

# Day 5 — QA + deployment + presentation

### Goal

**No new features unless absolutely necessary.**

Morning:

### Full QA

Test from a clean browser/session.

```text
□ Location allowed
□ Location denied
□ Vancouver fallback
□ Search
□ Autocomplete
□ Select city
□ Current weather
□ 5-day forecast
□ Day selection
□ 3-hour forecast
□ Add favorite
□ Remove favorite
□ Reload favorites
□ Desktop
□ Mobile
□ API failure
□ Loading state
```

Then:

### Deployment

Deploy early enough that you still have time to fix production-only problems.

After deployment:

```text
Live site
   ↓
Test again
   ↓
Fix production issues
   ↓
README
   ↓
Final commit
```

Don't treat deployment as the last 30 minutes of the project.

---

## Presentation preparation

Your presentation is only **10–15 minutes**, so don't explain every component.

A simple structure:

### 1. What you built — 2 min

Show the app.

### 2. How it works — 3 min

```text
PlaceKit
   ↓
City coordinates
   ↓
Open-Meteo
   ↓
Weather data
   ↓
Astro components
```

### 3. Team split — 2 min

Explain who worked on what.

### 4. Technical challenges — 3 min

Pick **2–3 real problems**, for example:

* geolocation fallback
* transforming API data
* synchronizing selected day with hourly forecast
* localStorage rehydration
* responsive forecast UI

### 5. What you learned — 2 min

Focus on concrete technical lessons.

### 6. Demo — remaining time

Have one **happy-path demo** prepared:

```text
Open app
→ show detected/default city
→ search another city
→ select it
→ show current weather
→ click Day 3
→ show 3-hour forecast
→ star it
→ reload
→ show favorite still exists
```

That gives you a very strong demonstration of the requirements.

---

# The overall 5-day strategy

I'd visualize the project like this:

```text
          DAY 1
       FOUNDATION
           │
           ▼
          DAY 2
    END-TO-END MVP
           │
           ▼
          DAY 3
    FEATURE COMPLETE
           │
           ▼
          DAY 4
   DESKTOP + MOBILE
           │
           ▼
          DAY 5
 QA → DEPLOY → PRESENT
```

The **critical milestone is Day 2**.

If Day 2 ends with a working:

> `City → WeatherData → UI`

pipeline, you have a very manageable project.

If Day 3 ends with all requirements working, **Day 4 becomes polish instead of emergency development**, and Day 5 becomes QA/deployment rather than "please don't break."

One extra thing that would be useful: before your team starts coding, a **30-minute technical kickoff document** defining the `City` type, `WeatherData` shape, component boundaries, folder structure, and Git branch ownership would prevent a lot of merge/integration pain. I can draft that as a concrete team agreement you can paste directly into your repo.
