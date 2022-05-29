# EQS Color picker challenge

## intro

The application you are working on needs a color picker for choosing the background-color of several elements in the layout.

We are using the native color picker input element which outputs color in hex. But we need to apply it to the background property as `rgba(red, green, blue, alpha)`.

## The challenge

Code a solution to this problem, the unit tests are already in place for you, make them green, then refactor. Similar to what TDD style.

### Recommendations

Use Chrome or Firefox only.

You should be able to run this directly in your browser from the file system.

You are encouraged to clean up, refactor, and add tests of your own, you can even add another testing library like Jasmine, as long as the existing test suite keeps running.

Do not remove (or comment out) any expectations or assertions from the test suite.

## At least 3 commits

One initial commit, then **one for each step**. If you make more than 2 commits, `git tag` each completed step.

## Step 1: Color conversion

Uncomment the script with `spec/colors.spec.js` as source in the `index.html` file.

Make sure `hexToRgba` and `rgbaToHex` work as expected by the tests.

## Step 2: Component

Uncomment the script with `spec/component.spec.js` as source in the `index.html` file.

Make sure the `div.component` takes in the `data-color` attribute as a component input to render the correct background color in the the `div.preview` element.

## Step 3: Bonus refactoring

Make improvements to this "application", if you had to maintain this for years, what would you do to make your work easier?
