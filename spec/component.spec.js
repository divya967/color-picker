// https://blog.codepen.io/2015/01/22/interviewing-front-end-hires-codepen/
QUnit.module('Color selection component', (hooks) => {
    let alphaInput = $('.alpha-input');
    let alphaValueDisplay = $('.alpha-value-display');
    let colorInput = $('.color-input');
    let colorValueDisplay = $('.color-value-display');
    let previewElement = $('.preview');
    let component = $('.component');

    QUnit.test(
        'Should have the required elements. They are: [.alpha-input, .alpha-value-display, .color-input, .color-value-display, .preview, .component, .chips-list] AND .component MUST have an attribute data-color',
        (assert) => {
            const missingElement =
                'One of the required elements are not found.';
            assert.equal(!!alphaInput, true, missingElement);
            assert.equal(!!alphaValueDisplay, true, missingElement);
            assert.equal(!!colorInput, true, missingElement);
            assert.equal(!!colorValueDisplay, true, missingElement);
            assert.equal(!!previewElement, true, missingElement);
            assert.ok($('.chips-list'), missingElement);
            assert.ok(
                !!$('.component[data-color]'),
                'data-color attribute is missing'
            );
        }
    );

    QUnit.test(
        'Clicking on an opaque chip button changes the bg-color of the preview',
        (assert) => {
            const done = assert.async();

            $('.chip--petrol').click();
            setTimeout(() => {
                const isValidRgba = !![
                    'rgb(36, 111, 161)',
                    'rgb(36,111,161)',
                    'rgba(36, 111, 161, 1)',
                    'rgba(36,111,161,1)',
                ].find(
                    (rgbaValue) =>
                        rgbaValue === previewElement.style.backgroundColor
                );
                assert.ok(isValidRgba, '[message]');
                done();
            }, 50);
        }
    );

    QUnit.test(
        'Clicking on a semy-transparent chip button changes the bg-color of the preview to an rgba() color... with matching hex color & alpha text displays',
        (assert) => {
            const done = assert.async();

            $('.chip--half-green').click();
            setTimeout(() => {
                assert.ok(
                    ['rgba(0, 150, 94, 0.5)', 'rgba(0,150,94,0.5)'].find(
                        (rgbaValue) =>
                            rgbaValue === previewElement.style.backgroundColor
                    ),
                    '[message]'
                );
                assert.equal(alphaValueDisplay.innerText, '50', '[message]');
                assert.equal(
                    colorValueDisplay.innerText,
                    '#00965e',
                    '[message]'
                );
                done();
            }, 50);
        }
    );

    QUnit.test(
        'Clicking outside a chip does NOT reset the background color to null',
        (assert) => {
            const done = assert.async();

            $('.chip--half-green').click();
            $('.chips-list').click();
            setTimeout(() => {
                assert.equal(
                    component.getAttribute('data-color').split(' ').join(''),
                    'rgba(0,150,94,0.5)',
                    '[message]'
                );
                done();
            }, 50);
        }
    );

    QUnit.test(
        'Selecting a color in the color picker and alpha sliders, is reflected in the .preview background',
        (assert) => {
            const done = assert.async();

            colorInput.value = '#00c3d0';
            alphaInput.value = 25;
            alphaInput.dispatchEvent(new Event('change'));
            setTimeout(() => {
                console.log(
                    'previewElement.style.backgroundColor',
                    previewElement.style.backgroundColor
                );
                assert.ok(
                    ['rgba(0, 195, 208, 0.25)', 'rgba(0,195,208,0.25)'].find(
                        (rgbaValue) =>
                            rgbaValue === previewElement.style.backgroundColor
                    ),
                    'rgba value does not match expectations'
                );
                assert.equal(
                    alphaValueDisplay.innerText,
                    '25',
                    'alpha value does not match expectation'
                );
                assert.equal(
                    colorValueDisplay.innerText,
                    '#00c3d0',
                    'color picker value does not match expectation'
                );
                done();
            }, 50);
        }
    );
});
