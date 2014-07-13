/**
 * Simple TC for KISSY ComboBox
 * @author yiminghe@gmail.com
 */

var util = require('util');
var ComboBox = require('combobox');
window.focus();
document.body.focus();

describe('validator', function () {
    beforeEach(function () {
        this.addMatchers({
            toBeNearEqual: function (expected) {
                return Math.abs(parseInt(this.actual, 10) - parseInt(expected, 10)) < 5;
            }
        });
    });

    it('validator works', function () {
        var data = ['1', '21', '31'];

        var ERROR = '太大了';

        var comboBox = new ComboBox({
            width: 200,
            validator: function (v, complete) {
                complete(parseInt(v, 10) > 10 ? ERROR : '');
            },
            render: 'body',
            dataSource: new ComboBox.LocalDataSource({
                data: data
            }),
            format: function (q, data) {
                var ret = [];
                util.each(data, function (d) {
                    ret.push({
                        content: d.replace(new RegExp(util.escapeRegExp(q), 'g'), '<b>$&</b>'),
                        textContent: d
                    });
                });
                return ret;
            }
        });
        comboBox.render();

        var t = comboBox.get('input')[0];

        t.value = '';

        t.focus();

        jasmine.simulate(t, 'keydown');

        waits(100);

        runs(function () {
            t.value = '11';
            jasmine.simulate(t, 'input');
        });
        // longer for ie8
        waits(500);

        runs(function () {
            t.focus();
            jasmine.simulate(t, 'keyup');
        });

        // longer for ie8
        waits(500);

        runs(function () {
            // firefox will not trigger blur event??
            // $(t).fire('blur');
            document.body.focus();
            window.focus();
            t.blur();
        });

        // longer for ie8
        waits(500);

        runs(function () {
            var error = '';
            comboBox.validate(function (err) {
                error = err;
            });
            expect(error).toBe(ERROR);
            expect(comboBox.get('el').hasClass('ks-combobox-invalid')).toBe(true);
            expect(comboBox.get('invalidEl').css('display')).toBe('block');
            expect(comboBox.get('invalidEl').attr('title')).toBe(ERROR);
        });

        // ok
        waits(100);

        runs(function () {
            t.focus();
            jasmine.simulate(t, 'keydown');
        });

        waits(100);

        runs(function () {
            t.value = '3';
            jasmine.simulate(t, 'input');
        });

        waits(100);

        runs(function () {
            jasmine.simulate(t, 'keyup');
        });


        runs(function () {
            // firefox will not trigger blur event??
            // $(t).fire('blur');
            t.blur();
        });

        waits(100);

        runs(function () {
            var error = '';
            comboBox.validate(function (err) {
                error = err;
            });
            expect(error).toBe('');
            expect(comboBox.get('el').hasClass('ks-combobox-invalid')).toBe(false);
            expect(comboBox.get('invalidEl').css('display')).toBe('none');
        });

        runs(function () {
            comboBox.destroy();
        });
    });
});