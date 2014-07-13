/**
 * @module  draggable-spec
 * @author yiminghe@gmail.com
 * ie9 模式下 mousemove 触发事件有问题，无法测试
 */
(function () {
    var $ = require('node'),
        win = $(window),
        DD = require('dd'),
        IO = require('io');
    var UA = require('ua');
    var Draggable = DD.Draggable;

    var ie = UA.ieMode;
    if (ie === 9 || ie === 11) {
        return;
    }

    describe('draggable', function () {
        var html = '';

        IO({
            url: '../specs/draggable.fragment.html',
            async: false,
            success: function (data) {
                html = data;
                $('body').append(html);
            }
        });

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

        it('should not drag before mousedown while mousemove', function () {

            var drag = $('#drag_before'),
                dragHeader = $('#dragHeader_before');
            var action = new Draggable({
                    node: drag,
                    move: 1,
                    handlers: [dragHeader],
                    groups: false
                }),
                scrollLeft = win.scrollLeft(),
                scrollTop = win.scrollTop();

            waits(300);
            runs(function () {
                jasmine.simulate(document, 'mousemove', {
                    clientX: -100 - scrollLeft,
                    clientY: -100 - scrollTop
                });
            });
            waits(50);
            runs(function () {
                var expected = 500;
                //if (ie == 7) expected += 2;
                expect(drag.offset().top).toBeEqual(expected);
                expect(drag.offset().left).toBeEqual(expected);
                jasmine.simulate(document, 'mouseup');
                action.destroy();
            });
        });

        it('should drag after mousedown while mousemove after exceeding clickPixelThresh', function () {

            var drag = $('#drag'),
                dragHeader = $('#dragHeader'),
                scrollLeft = win.scrollLeft(),
                scrollTop = win.scrollTop();
            var action = new Draggable({
                node: drag,
                move: 1,
                handlers: [dragHeader],
                groups: false
            });

            var xy = dragHeader.offset();

            runs(function () {

                jasmine.simulate(dragHeader[0], 'mousedown', {
                    clientX: xy.left - scrollLeft,
                    clientY: xy.top - scrollTop
                });
            });

            function move() {
                jasmine.simulate(document, 'mousemove', {
                    clientX: xy.left - 10 - scrollLeft,
                    clientY: xy.top - 10 - scrollTop
                });
            }

            for (var i = 0; i < 10; i++) {
                waits(30);

                // 10px move to start
                runs(move);
            }

            waits(100);
            runs(function () {

                jasmine.simulate(document, 'mousemove', {
                    clientX: xy.left - 100 - scrollLeft,
                    clientY: xy.top - 100 - scrollTop
                });
            });

            waits(300);

            runs(function () {
                jasmine.simulate(document, 'mouseup', {
                    clientX: xy.left - 100 - scrollLeft,
                    clientY: xy.top - 100 - scrollTop
                });
            });

            waits(300);
            runs(function () {

                var expected = 450;
                //if (ie == 7) expected += 2;
                expect(drag.offset().top).toBeEqual(expected);
                expect(drag.offset().left).toBeEqual(expected);
                action.destroy();
            });
        });

        it('should not drag after mouseup while mousemove', function () {
            var drag = $('#drag_after'),
                dragHeader = $('#dragHeader_after');

            var action = new Draggable({
                node: drag,
                move: 1,
                handlers: [dragHeader],
                groups: false
            });

            var xy = dragHeader.offset();

            runs(function () {
                jasmine.simulate(dragHeader[0], 'mousedown', {
                    clientX: xy.left - win.scrollLeft(),
                    clientY: xy.top - win.scrollTop()
                });
            });
            waits(100);

            // 10px move to start
            runs(function () {
                jasmine.simulate(document, 'mousemove', {
                    clientX: xy.left - 10 - win.scrollLeft(),
                    clientY: xy.top - 10 - win.scrollTop()
                });
            });

            waits(100);
            runs(function () {
                jasmine.simulate(document, 'mousemove', {
                    clientX: xy.left + 100 - win.scrollLeft(),
                    clientY: xy.top + 100 - win.scrollTop()
                });
            });
            waits(300);

            runs(function () {
                jasmine.simulate(document, 'mouseup', {
                    clientX: xy.left + 100 - win.scrollLeft(),
                    clientY: xy.top + 100 - win.scrollTop()
                });
            });
            waits(300);
            runs(function () {
                jasmine.simulate(document, 'mousemove', {
                    clientX: xy.left - 300 - win.scrollLeft(),
                    clientY: xy.top - 300 - win.scrollTop()
                });
            });
            runs(function () {
                var expected = 100;
                //if (ie == 7) expected += 2;
                expect(drag.offset().top - xy.top).toBeEqual(expected);
                expect(drag.offset().left - xy.left).toBeEqual(expected);
                action.destroy();
            });
        });

        it('disabled works', function () {
            var drag = $('#drag'),
                dragHeader = $('#dragHeader');

            var action = new Draggable({
                node: drag,
                disabled: true,
                move: 1,
                handlers: [dragHeader],
                groups: false
            });

            var xy = dragHeader.offset();

            runs(function () {
                jasmine.simulate(dragHeader[0], 'mousedown', {
                    clientX: xy.left - win.scrollLeft(),
                    clientY: xy.top - win.scrollTop()
                });
            });

            // exceed bufferTime
            waits(1100);

            runs(function () {

                jasmine.simulate(document, 'mousemove', {
                    clientX: xy.left + 100 - win.scrollLeft(),
                    clientY: xy.top + 100 - win.scrollTop()
                });
            });

            waits(100);

            runs(function () {
                jasmine.simulate(document, 'mouseup', {
                    clientX: xy.left + 100 - win.scrollLeft(),
                    clientY: xy.top + 100 - win.scrollTop()
                });
            });

            waits(100);
            runs(function () {
                expect(drag.offset().top - xy.top).toBeEqual(0);
                expect(drag.offset().left - xy.left).toBeEqual(0);
                action.destroy();
            });
        });

        runs(function () {
            $('#drag_before').remove();
            $('#drag').remove();
            $('#drag_after').remove();
        });
    });
})();