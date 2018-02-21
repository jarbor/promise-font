/* Based on jQuery-FontSpy.js (https://github.com/patrickmarabeas/jQuery-FontSpy.js/blob/master/jQuery-FontSpy.js)
 */

const BASELINE_FONT = 'Courier New';
const TEST_STRING = 'QW@HhsiXJ';
const INTERVAL = 50;
const TIMEOUT = 2000;

let promiseFont = (fontName, config) => {
	config = config || {};
	let baselineFont = config.baselineFont || BASELINE_FONT;

	// Prepare the baseline test
	let tester = document.createElement('span');
	tester.innerHTML = TEST_STRING + config.glyphs;
	tester.style.display = 'inline-block';
	tester.style.position = 'absolute';
	tester.style.top = '-9999px';
	tester.style.left = '-9999px';
	tester.style.visibility = 'hidden';
	tester.style.fontFamily = BASELINE_FONT;
	tester.style.fontSize = '250px';

	// Attach to the DOM and measure the baseline font width
	document.querySelector('body').appendChild(tester);
	let originalWidth = tester.clientWidth;

	// Update the font family and begin the interval testing
	tester.style.fontFamily = `${fontName}, ${baselineFont}`;

	return new Promise((resolve, reject) => {
		let timeoutHandler = setTimeout(() => {
			finalize();
			reject();
		}, config.timeout || TIMEOUT);
		
		let intervalHandler = setInterval(testFont, config.interval || INTERVAL);

		function testFont() {
			if (tester.clientWidth != originalWidth) {
				finalize();
				resolve();
			}
		}

		function finalize() {
			clearTimeout(timeoutHandler);
			clearInterval(intervalHandler);
			tester.remove();
		}
	});

};

export default promiseFont;