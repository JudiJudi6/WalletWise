import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
:root {
  --color-white-100: #f1f1f1;
  --color-white-200: #ececec;
  --color-white-300: #cdcdcd;

  --color-black-100: #252c37;
  --color-black-200: #1d2733;
  --color-black-400: #1c1c1c;
  --color-black-300: #161d28;
  --color-black-500: #100f10;

  --color-main: #6561e7;
  --color-pink: #d765af;
  --color-purple: #9d70ee;
  --color-helper: #334356;
  --color-error: #d20700;
  --color-error-dark: #b01000;

  
  --color-dark-blue: #2e294e;
  --color-gold: #ffd400;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  padding: 0;
  margin: 0;

  /* Creating animations for dark mode */
  transition: background-color 0.3s, border 0.3s;
}

html {
  font-size: 62.5%;
}

body {
  font-family: "Poppins", sans-serif;
  color: var(--color-white-100);
  background-color: var(--color-black-100);

  transition: color 0.3s, background-color 0.3s;
  min-height: 100vh;
  line-height: 1.5;
  font-size: 1.6rem;
}

input,
button,
textarea,
select {
  font: inherit;
  color: inherit;
}

button {
  cursor: pointer;
  border:none;
}

*:disabled {
  cursor: not-allowed;
}

/* select:disabled,
input:disabled {
  background-color: var(--color-grey-200);
  color: var(--color-grey-500);
} */

input:focus,
button:focus,
textarea:focus,
select:focus {
  outline: 2px solid var(--color-main);
  outline-offset: -1px;
}

input[type="date"]::-webkit-calendar-picker-indicator {
  font-size: 2rem;
  background-image: url('/public/calendar.svg');
  margin-right: 3px;
  cursor: pointer;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

button:has(svg) {
  line-height: 0;
}

a {
  color: inherit;
  text-decoration: none;
}

ul {
  list-style: none;
}

p,
h1,
h2,
h3,
h4,
h5,
h6 {
  overflow-wrap: break-word;
  hyphens: auto;
}

::-webkit-scrollbar{
  background-color: transparent;
  width:0;
}

::-webkit-scrollbar-thumb{
  background-color: transparent;
}

img {
  max-width: 100%;
}

`;

export default GlobalStyles;
