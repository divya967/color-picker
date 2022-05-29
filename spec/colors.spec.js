// https://blog.codepen.io/2015/01/22/interviewing-front-end-hires-codepen/
QUnit.module('Conversion', () => {
    QUnit.test(
        'The function rgbaToHex(rgba) converts an rgba string into a tuple [string,float]. Defaults to white',
        (assert) => {
            const inputs = [
                'rgba',
                'rgba()',
                'rgba(0,0,0,1)',
                'rgba(0,0,0,0)',
                'rgba(255,0,0,0.5)',
                'rgba(255,0,255,0.33333)',
            ];
            const outputs = [
                ['#ffffff', 100],
                ['#ffffff', 100],
                ['#000000', 100],
                ['#000000', 0],
                ['#ff0000', 50],
                ['#ff00ff', 33.333],
            ];
            inputs.forEach((input, index) => {
                const answer = rgbaToHex(input);
                answer[0] = answer[0] + ''.toLowerCase();
                assert.deepEqual(answer, outputs[index], 'Should be the same');
            });
        }
    );

    QUnit.test(
        'The function rgbaToHex(rgba) converts should limit decimal places to 3 positions',
        (assert) => {
            const inputs = [
                'rgba(255,0,255,0.33333333)',
                'rgba(255,2,255,0.33333333)',
            ];
            const outputs = [
                ['#ff00ff', 33.333],
                ['#ff02ff', 33.333],
            ];
            inputs.forEach((input, index) => {
                const answer = rgbaToHex(input);
                answer[0] = answer[0] + ''.toLowerCase();
                assert.deepEqual(answer, outputs[index], 'Should be the same');
            });
        }
    );

    QUnit.test(
        'The function rgbaToHex(rgba) should allow accepted whitespace',
        (assert) => {
            const inputs = [
                'rgba(255, 11, 255, 0.77)',
                'rgba( 255 , 22 , 255 , 1)',
            ];
            const outputs = [
                ['#ff0bff', 77],
                ['#ff16ff', 100],
            ];
            inputs.forEach((input, index) => {
                const answer = rgbaToHex(input);
                answer[0] = answer[0] + ''.toLowerCase();
                assert.deepEqual(answer, outputs[index], 'Should be the same');
            });
        }
    );

    QUnit.test(
        'The function hexToRgba(rgbColor, alpha) converts a pair of parameters rgb and aplha into an "rgba(red,green,blue,alpha)" string (no spaces).',
        (assert) => {
            const inputs = [
                ['#000000', 100],
                ['#000000', 0],
                ['#ff0000', 50],
            ];
            const outputs = [
                'rgba(0,0,0,1)',
                'rgba(0,0,0,0)',
                'rgba(255,0,0,0.5)',
            ];
            inputs.forEach(([hex, alpha], index) => {
                const answer = hexToRgba(hex, alpha).toLowerCase();
                assert.deepEqual(answer, outputs[index], 'Should be the same');
            });
        }
    );

    QUnit.test(
        'The function hexToRgba(rgbColor, alpha). Defaults to white for any invalid input.',
        (assert) => {
            const inputs = [
                ['#fffff', 100],
                ['#fff', 50],
                ['helloworld', 0.05],
                ['#FFFFFFFF', 60],
            ];
            inputs.forEach(([hex, alpha], index) => {
                const answer = hexToRgba(hex, alpha).toLowerCase();
                assert.deepEqual(
                    answer,
                    'rgba(255,255,255,1)',
                    'Should default to white.'
                );
            });
        }
    );

    QUnit.test(
        'The function hexToRgba(rgbColor, alpha) the alpha value should tolerate up to 3 decimals and output up to 5 decimals',
        (assert) => {
            const inputs = [['#ff00ff', 33.333]];
            const outputs = ['rgba(255,0,255,0.33333)'];
            inputs.forEach(([hex, alpha], index) => {
                const answer = hexToRgba(hex, alpha).toLowerCase();
                assert.deepEqual(answer, outputs[index], 'Should be the same');
            });
        }
    );

    QUnit.test(
        'Both functions hexToRgba(rgbColor, alpha) and rgbaToHex(rgba) should be interop',
        (assert) => {
            const inputsHex = [
                ['#ff00ff', 33.333],
                ['#25695f', 78],
            ];
            const inputsRgba = [
                'rgba(255,0,255,0.33333)',
                'rgba(37,105,95,0.78)',
            ];
            inputsHex.forEach(([hex, alpha], index) => {
                const answer = hexToRgba(hex, alpha).toLowerCase();
                assert.deepEqual(
                    rgbaToHex(answer),
                    inputsHex[index],
                    'Should be the same'
                );
            });
            inputsRgba.forEach((rgba, index) => {
                const answer = rgbaToHex(rgba);
                answer[0] = answer[0] + ''.toLowerCase();
                assert.deepEqual(
                    hexToRgba(answer[0], answer[1]),
                    inputsRgba[index],
                    'Should be the same'
                );
            });
        }
    ); // https://app.testdome.com/questions/edit/46171
});
