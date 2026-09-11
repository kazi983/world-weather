# 👥 Group Work Plan
| Member                            | Main responsibility                                         | Secondary responsibility |
| --------------------------------- | ----------------------------------------------------------- | ------------------------ |
| **Kazi — Lead / API**         | Astro setup, Weather API, geolocation, Vancouver fallback | Integration              |
| **Miu — Search / Favorites** | PlaceKit API (autocomplete), favorites dropdown, localStorage     | Search UI                |
| **Sarai — Weather UI**         | Show current weather, 5-day forecast, 3-hour forecast            | Responsive UI            |
## STEP 1: Decide the app structure together

**All 3 members**

Decide these together before writing feature code:

### Page structure

```text
Weather App
│
├── Header
│   ├── App title (KMS Weather)
│   ├── Search input
│   └── Favorite cities
│
├── Current Weather
│
├── 5-Day Forecast
│
└── 3-Hour Forecast
```

### Decide element IDs/classes

- id - not isActive, but is-active
- classes - use BEM like below

For example:

```html
<input id="citySearch">

<div id="search-results">
  <div class="title">
</div>

.title {

}

<select id="favorite-cities"></select>

<section id="current-weather">
  <div class="current-weather__title"> <!-- DO THIS -->
</section>

<section id="daily-forecast"></section>

<section id="hourly-forecast"></section>
```

**Don't let each person invent their own names.**

---

# STEP 2: Decide the data flow together

**All 3 members**

This is the biggest thing to agree on.

### Search

```text
Miu
 ↓
PlaceKit
 ↓
City name
Province name
Country name
Latitude
Longitude
 ↓
Kazi
 ↓
Open-Meteo
 ↓
Weather data
 ↓
Sarai
 ↓
Display weather
```

### Example

User searches:

> Toronto

Miu gets:

```js
{
  city: "Toronto",
  province: "Ontario",
  country: "Canada",
  latitude: 43.65,
  longitude: -79.38
}
```

Then Kazi uses:

```text
latitude
longitude
```

to request weather.

Then Sarai uses the weather response to display:

```text
Current Weather
5-Day Forecast
3-Hour Forecast
```

Everyone needs to understand this before coding.

---

# STEP 3: Decide who owns which files

This prevents Git conflicts.

### Kazi

```text
src/
├── scripts/
│   └── weather.js
```

Responsible for:

* Open-Meteo API
* Geolocation
* Vancouver fallback
* Weather data

---

### Miu

```text
src/
├── scripts/
│   ├── search.js
│   └── favorites.js
```

Responsible for:

* Search input
* PlaceKit
* Search suggestions
* Favorite button
* Favorite dropdown
* localStorage

---

### Sarai

```text
src/
├── components/
│   ├── CurrentWeather.astro
│   ├── DailyForecast.astro
│   └── HourlyForecast.astro
```

Responsible for:

* Current weather display
* 5-day forecast
* 3-hour forecast

---

# STEP 4: Build the basic HTML together

**All 3 members**

Do this **before individual feature development**.

Create the basic page:

```html
<header>
  <h1>Weather App</h1>

  <!-- Miu -->
  <input id="city-search">
  <select id="favorite-cities"></select>
</header>

<main>

  <!-- Sarai -->
  <section id="current-weather">
  </section>

  <!-- Sarai -->
  <section id="daily-forecast">
  </section>

  <!-- Sarai -->
  <section id="hourly-forecast">
  </section>

</main>
```

Don't worry about beautiful design yet.

The assignment says to focus on **functionality first**, then styling and responsiveness.

---

# STEP 5: Each person develops their feature

Now separate.

## 👨‍💻 Kazi

### Task 1

Get user's location.

```text
Browser
 ↓
Geolocation API
 ↓
latitude + longitude
```

### Task 2

If location is denied:

```text
Vancouver
```

The Vancouver fallback is mandatory in the requirements.

### Task 3

Create Weather API function.

Something like:

```js
getWeather(latitude, longitude)
```

It should return the weather data.

### Task 4

Make sure Miu and Sarai can use the data.

---

# 👩‍💻 Miu

### Task 1

Create search input.

User types:

```text
Van
```

↓

PlaceKit returns suggestions:

```text
Vancouver
Vancouver, Washington
...
```

### Task 2

User clicks:

```text
Vancouver
```

You get:

```text
city
latitude
longitude
```

### Task 3

Send the selected location to Kazi's weather function.

### Task 4

Favorite button ⭐

User clicks:

```text
⭐ Vancouver
```

↓

Save to:

```js
localStorage
```

### Task 5

When the page loads:

```text
localStorage
 ↓
Favorite cities
 ↓
Dropdown
```

This is specifically required by the assignment.

---

# 👩‍💻 Sarai

Sarai receives the weather data and displays it.

### Task 1: Current Weather

Display things such as:

```text
Vancouver

☀️

18°C
Sunny

Wind
Humidity
```

### Task 2: 5-Day Forecast

For example:

```text
Mon    ☀️   18°C
Tue    🌧️   15°C
Wed    ☁️   17°C
Thu    ☀️   20°C
Fri    🌧️   14°C
```

### Task 3: 3-Hour Forecast

For example:

```text
12 PM   ☀️   18°C
3 PM    ☀️   19°C
6 PM    🌤️   17°C
9 PM    🌙   13°C
```

### Task 4

When the user clicks:

```text
Tuesday
```

the 3-hour forecast changes to Tuesday's data.

This interaction is explicitly required.

---

# STEP 6: Integration meeting

After everyone finishes their first version:

### All 3 meet together.

Test this exact scenario:

### Test 1

```text
Open website
 ↓
Allow location
 ↓
Current location appears
 ↓
Weather appears
```

### Test 2

```text
Block location
 ↓
Vancouver appears
 ↓
Weather appears
```

### Test 3

```text
Search "Toronto"
 ↓
Suggestions appear
 ↓
Click Toronto
 ↓
Toronto weather appears
```

### Test 4

```text
Click ⭐
 ↓
Toronto added to favorites
 ↓
Refresh page
 ↓
Toronto still exists
```

### Test 5

```text
Open favorite dropdown
 ↓
Select Toronto
 ↓
Toronto weather appears
```

### Test 6

```text
Click Wednesday
 ↓
3-hour forecast changes
```

---

# STEP 7: Responsive design together

**All 3 members**

After functionality works, work on:

### Desktop

```text
1440px
```

### Mobile

```text
375px
```

These are the required target sizes.

But don't redesign everything.

Instead:

```text
Desktop works
     ↓
Check 375px
     ↓
Find problems
     ↓
Add media queries
     ↓
Fix only those problems
```

---

# STEP 8: Code review together

Each person explains their code to the other two.

For example:

### Kazi explains

> "This function gets latitude and longitude and calls Open-Meteo."

### Miu explains

> "This function saves the favorite city to localStorage."

### Sarai explains

> "This function takes the daily weather data and creates the forecast cards."

This is useful because **code readability, error handling, teamwork, and GitHub contributions are part of the marking criteria.**

---

# STEP 9: Presentation together

All 3 members prepare the slides.

The assignment wants you to explain:

1. What you built
2. How you divided the work
3. What you learned
4. What was difficult
5. How you solved the problems



A simple presentation structure:

```text
Slide 1
Project introduction

Slide 2
App features

Slide 3
Team responsibilities

Slide 4
How the APIs work

Slide 5
GitHub / teamwork

Slide 6
Difficulties & solutions

Slide 7
Demo

Slide 8
What we learned
```

---

# 🗓️ Recommended team schedule

| Time      | Group                          | Individual                |
| --------- | ------------------------------ | ------------------------- |
| **Day 1** | Structure + data flow + naming | Start assigned tasks      |
| **Day 2** | Quick progress check           | Continue coding           |
| **Day 3** | API integration                | Finish main functionality |
| **Day 4** | Integration testing            | Fix bugs                  |
| **Day 5** | Responsive design              | Fix individual UI         |
| **Day 6** | Full testing                   | Bug fixes                 |
| **Day 7** | Presentation                   | Prepare slides            |
