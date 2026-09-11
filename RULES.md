# Styling Rules

## 1. Naming Conventions

### IDs

Use camelCase.

```html
<div id="userProfile"></div>
<div id="resultContainer"></div>
```

### Classes

Use camelCase.

```html
<article class="weatherCard">
  <h2 class="weatherCardTitle">Vancouver</h2>
  <p class="weatherCardDescription">Sunny</p>
</article>
```

For state classes, use `is` or `has` prefixes:

```html
<button class="button isActive"></button>
<div class="form hasError"></div>
```

Do not use BEM.

---

## 2. Style File Structure

Keep global styles and component styles separate.

```text
src/
├── styles/
│   ├── _variables.scss
│   └── global.scss
│
└── components/
    ├── Header.astro
    ├── WeatherCard.astro
    └── WeatherCard.scss # Only when appropriate
```

### Common styles

```text
src/styles/_variables.scss
src/styles/global.scss
```

### `_variables.scss`

Store shared SCSS variables.

### `global.scss`

Store styles that apply globally, such as:

* CSS reset
* `body`
* typography defaults
* global utility classes
* global state classes

---

## 3. Component Styles

Keep component-specific styles inside the `.astro` file:

```astro
<div class="weatherCard">
  <h2 class="weatherCardTitle">Vancouver</h2>
</div>

<style lang="scss">
.weatherCard {
  padding: $spacingMd;

  .weatherCardTitle {
    color: $colorPrimary;
  }

  &.isFeatured {
    border: 2px solid $colorPrimary;
  }
}
</style>
```

Use a separate `.scss` file only when the component's styles become large or complex.

---

## 4. SCSS Guidelines

### Keep nesting shallow

Good:

```scss
.weatherCard {
  padding: $spacingMd;

  .weatherCardTitle {
    font-size: 1.25rem;
  }
}
```

Avoid deeply nested selectors:

```scss
.weatherCard {
  .content {
    .title {
      span {
        // Avoid
      }
    }
  }
}
```

### Use variables for shared values

```scss
padding: $spacingMd;
color: $colorPrimary;
```

Do not create variables for values that are used only once unless there is a clear reason.

### Import shared variables

When using variables from `_variables.scss`, import them into the component:

```scss
@use "../styles/variables" as *;
```

---

## 5. Astro Styling

Use:

```astro
<style lang="scss">
```

for SCSS written directly inside an Astro component.

Astro `<style>` blocks are scoped to the component by default.

Use component-scoped styles for component-specific UI.

Use `global.scss` only when a style genuinely needs to affect multiple components or the entire application.

---

## 6. General Rules

* Use camelCase for IDs.
* Use camelCase for classes.
* Do not use BEM.
* Use `isActive` / `hasError` for UI states.
* Avoid styling with IDs.
* Avoid `!important` unless there is a specific technical reason.
* Avoid deeply nested SCSS.
* Do not add global styles for a single component.
* Keep selectors simple and predictable.
