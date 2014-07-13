/**
 * test case for anim scroll
 * @author yiminghe@gmail.com
 */
var Dom = require('dom');
var Anim = require('anim');
var UA = require('ua');

describe('anim-scroll', function () {

    beforeEach(function () {
        this.addMatchers({
            toBeAlmostEqual: function (expected) {
                return Math.abs(parseInt(this.actual, 10) - parseInt(expected, 10)) < 20;
            },


            toBeEqual: function (expected) {
                return Math.abs(parseInt(this.actual, 10) - parseInt(expected, 10)) < 5;
            }
        });
    });

    it('should animate scroll correctly', function () {
        var test = Dom.create('<div style="width:100px;overflow:hidden;' +
            'border:1px solid red;">' +
            '<div style="width:500px;">' +
            '1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,' +
            '6,7,8,9,0,1,2,3,4,5,6,7,8,9,0,1,2,' +
            '3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9,' +
            '0,1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,' +
            '6,7,8,9,0,1,2,3,4,5' +
            ',6,7,8,9,0,1,2,3,4,5,6,7,8,9,0,1,2,' +
            '3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9,0,' +
            '</div>' +
            '</div>');
        Dom.append(test, 'body');
        test.scrollLeft = 500;
        var scrollLimit = test.scrollLeft;
        test.scrollLeft = 0;
        new Anim(test, {
            scrollLeft: scrollLimit
        }, 0.5).run();
        waits(100);
        runs(function () {
            expect(test.scrollLeft).not.toBe(0);
        });
        waits(800);
        runs(function () {
            expect(test.scrollLeft).toBe(scrollLimit);
        });
    });

    if (!window.frameElement) {
        it('should animate scroll correctly for window', function () {
            Dom.append(Dom.create('<div style="height:2000px"/>'), document.body);
            Dom.scrollTop(window, 0);
            waits(300);
            var anim;

            runs(function () {
                anim = new Anim(window, {
                    scrollTop: 100
                }, 0.5).run();
            });

            waits(300);
            runs(function () {
                expect(Dom.scrollTop(window)).not.toBe(0);
            });

            waits(600);
            runs(function () {
                expect(Dom.scrollTop(window)).toBe(100);
                anim.stop();
            });
            // wierd android browser
            if (UA.android) {
                return;
            }
            runs(function () {
                Dom.scrollTop(window, 0);
                anim = new Anim(window, {
                    scrollTop: 100
                }, 0.5).run();
            });

            waits(300);
            runs(function () {
                expect(Dom.scrollTop(window)).not.toBe(0);
                anim.stop();
            });

            waits(600);
            runs(function () {
                expect(Dom.scrollTop(window)).not.toBe(100);
                expect(Dom.scrollTop(window)).not.toBe(0);
            });

            runs(function () {
                Dom.scrollTop(window, 0);
                anim = new Anim(window, {
                    scrollTop: 100
                }, 0.5).run();
            });

            waits(300);
            runs(function () {
                expect(Dom.scrollTop(window)).not.toBe(0);
                anim.stop(true);
                expect(Dom.scrollTop(window)).toBe(100);
                expect(Dom.scrollTop(window)).not.toBe(0);
            });
        });
    }

});
