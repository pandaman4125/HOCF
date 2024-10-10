# HOCF Website

## Usage

```bash
npm install
```

### Basic Usage

```bash
# make changes
npm start # this does the build and starts the server
git push
```

#### npm Scripts

- `npm run build` builds the project - this builds assets, HTML, JS, and CSS into `docs`
- `npm run build:assets` copies the files in the `src/assets/` directory into `docs`
- `npm run build:pug` compiles the Pug located in the `src/pug/` directory into `docs`
- `npm run build:scripts` brings the `src/js/scripts.js` file into `docs`
- `npm run build:scss` compiles the SCSS files located in the `src/scss/` directory into `docs`
- `npm run clean` deletes the `docs` directory to prepare for rebuilding the project
- `npm run start:debug` runs the project in debug mode
- `npm start` or `npm run start` runs the project, launches a live preview in your default browser, and watches for changes made to files in `src`

## About

Start Bootstrap is an open source library of free Bootstrap themes and templates.

- <https://startbootstrap.com>
- <https://twitter.com/SBootstrap>
