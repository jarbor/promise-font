# promise-font
Get a promise that will resolve when a specified font has been loaded and reject if the font fails to load before the timeout. This is mostly useful for handling complex UX issues resulting from the difference between the default font's size and the specified font's size.

This package was heavily inspired by Patrick Marabeas's [jQuery-FontSpy](https://github.com/patrickmarabeas/jQuery-FontSpy.js). This package takes the same approach but modernizes the project by:
* Removing the jQuery dependency
* Providing support for AMD, CommonJS and ES6 includes
* Providing support for yarn/npm
* Using promises instead of callbacks

## Installation
```
yarn add promise-font
```

### ES6
```js
import promiseFont from 'promise-font';
```

### CommonJS
```js
var promiseFont = require('promise-font');
```

### Global Script Include
```html
<script src="promise-font.js">
```

## Usage
### Basic Example
```js
promiseFont('Archivo Narrow').then(() => {
  console.log('Font loaded!');
}).catch(() => {
  console.log('Font failed to load before timeout exceeded');
});
```

### API
`promiseFont` is a function which takes a font name and optionally a config object. The config object can take the following options:
* Integer `timeout` - Stop checking for the font to load after specified milliseconds. Default `2000`.
* Integer `interval` - Check to see if the font is loaded every specified interval in milliseconds. Default `50`.
* String `baselineFont` - The default font to use for width baseline comparison. Default `'Courier New'`.
* String `glyphs` - Additional characters to include in the font test. Default `undefined`.

### Complete Example
```js
promiseFont('Archivo Narrow', {
  timeout: 10 * 1000,        // 10 second timeout
  interval: 10,              // 10 millisecond interval
  glyphs: '\t',              // Include the tab character in the font test
  baselineFont: 'sans-serif' // Change the baseline font test to sans-serif
}).then(() => {
  console.log('Font loaded!');
}).catch(() => {
  console.log('Font failed to load before timeout exceeded');
});
```
