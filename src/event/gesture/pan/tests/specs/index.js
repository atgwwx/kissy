/**
 * test drag gesture
 * @author yiminghe@gmail.com
 */
(function () {
    var UA = require('ua');
    var $ = require('node');
    var PanGesture = require('event/gesture/pan');
    var ie = UA.ieMode;
    var Feature = require('feature');

    describe('drag gesture', function () {
        if (!UA.ios&& UA.ieMode >= 10) {
            it('works for mouse', function () {
                var d = $('<div style="position:absolute;left:0;top:0;width: 100px;height: 100px"></div>');
                d.appendTo(document.body);
                var start = 0;
                var move = 0;
                var end = 0;

                d.on(PanGesture.PAN_START, function (e) {
                    expect(e.gestureType||'mouse').toBe('mouse');
                    start = 1;
                    expect(e.pageX).toBe(14);
                    expect(e.pageY).toBe(14);
                    e.preventDefault();
                });

                d.on(PanGesture.PAN, function (e) {
                    expect(e.gestureType||'mouse').toBe('mouse');
                    move = 1;
                    expect(e.pageX).toBe(16);
                    expect(e.pageY).toBe(16);
                    e.preventDefault();
                });

                d.on(PanGesture.PAN_END, function (e) {
                    expect(e.gestureType||'mouse').toBe('mouse');
                    end = 1;
                    expect(e.pageX).toBe(16);
                    expect(e.pageY).toBe(16);
                    expect(e.velocityX).not.toBe(0);
                    expect(e.velocityY).not.toBe(0);
                });

                runs(function () {
                    jasmine.simulate(d[0], 'mousedown', {
                        clientX: 10,
                        clientY: 10
                    });
                });

                waits(30);
                runs(function () {
                    jasmine.simulate(document, 'mousemove', {
                        clientX: 11,
                        clientY: 11
                    });
                });

                waits(30);
                runs(function () {
                    // 3px distance
                    jasmine.simulate(document, 'mousemove', {
                        clientX: 14,
                        clientY: 14
                    });
                });

                waits(10);
                runs(function () {
                    jasmine.simulate(document, 'mousemove', {
                        clientX: 16,
                        clientY: 16
                    });
                });


                waits(30);
                runs(function () {
                    jasmine.simulate(document, 'mouseup', {
                        clientX: 26,
                        clientY: 26
                    });
                });

                waits(300);
                runs(function () {
                    expect(start).toBe(1);
                    expect(move).toBe(1);
                    expect(end).toBe(1);
                    d.remove();
                });
            });
        }

        if (Feature.isTouchEventSupported()) {
            it('works for touch events', function () {
                var d = $('<div style="position:absolute;left:0;top:0;width: 100px;height: 100px"></div>');
                d.appendTo(document.body);
                var start = 0;
                var move = 0;
                var end = 0;

                d.on(PanGesture.PAN_START, function (e) {
                    expect(e.gestureType).toBe('touch');
                    start = 1;
                    expect(e.pageX).toBe(14);
                    expect(e.pageY).toBe(14);
                    e.preventDefault();
                });

                d.on(PanGesture.PAN, function (e) {
                    expect(e.gestureType).toBe('touch');
                    move = 1;
                    expect(e.pageX).toBe(16);
                    expect(e.pageY).toBe(16);
                    e.preventDefault();
                });

                d.on(PanGesture.PAN_END, function (e) {
                    expect(e.gestureType).toBe('touch');
                    end = 1;
                    expect(e.pageX).toBe(16);
                    expect(e.pageY).toBe(16);
                    expect(e.velocityX).not.toBe(0);
                    expect(e.velocityY).not.toBe(0);
                });
                runs(function () {
                    jasmine.simulate(d[0], 'touchstart', {
                        touches: [
                            {
                                pageX: 10,
                                pageY: 10
                            }
                        ],
                        changedTouches: [
                            {
                                pageX: 10,
                                pageY: 10
                            }
                        ],
                        targetTouches: [
                            {
                                pageX: 10,
                                pageY: 10
                            }
                        ]
                    });
                });

                waits(30);
                runs(function () {
                    jasmine.simulate(d[0], 'touchmove', {
                        touches: [
                            {
                                pageX: 11,
                                pageY: 11
                            }
                        ],
                        changedTouches: [
                            {
                                pageX: 11,
                                pageY: 11
                            }
                        ],
                        targetTouches: [
                            {
                                pageX: 11,
                                pageY: 11
                            }
                        ]
                    });
                });

                waits(30);
                runs(function () {
                    jasmine.simulate(d[0], 'touchmove', {
                        touches: [
                            {
                                pageX: 14,
                                pageY: 14
                            }
                        ],
                        changedTouches: [
                            {
                                pageX: 14,
                                pageY: 14
                            }
                        ],
                        targetTouches: [
                            {
                                pageX: 14,
                                pageY: 14
                            }
                        ]
                    });
                });

                waits(100);
                runs(function () {
                    jasmine.simulate(d[0], 'touchmove', {
                        touches: [
                            {
                                pageX: 16,
                                pageY: 16
                            }
                        ],
                        changedTouches: [
                            {
                                pageX: 16,
                                pageY: 16
                            }
                        ],
                        targetTouches: [
                            {
                                pageX: 16,
                                pageY: 16
                            }
                        ]
                    });
                });

                waits(300);
                runs(function () {
                    jasmine.simulate(d[0], 'touchend', {
                        touches: [
                            {
                                pageX: 26,
                                pageY: 26
                            }
                        ],
                        changedTouches: [
                            {
                                pageX: 26,
                                pageY: 26
                            }
                        ],
                        targetTouches: [
                            {
                                pageX: 26,
                                pageY: 26
                            }
                        ]
                    });
                });

                waits(300);
                runs(function () {
                    expect(start).toBe(1);
                    expect(move).toBe(1);
                    expect(end).toBe(1);
                    d.remove();
                });
            });
            it('does not work for more than two touches', function () {
                var d = $('<div style="position:absolute;left:0;top:0;width: 100px;height: 100px"></div>');
                d.appendTo(document.body);
                var start = 0;
                var move = 0;
                var end = 0;

                d.on(PanGesture.PAN_START, function (e) {
                    expect(e.gestureType).toBe('touch');
                    start = 1;
                    expect(e.pageX).toBe(14);
                    expect(e.pageY).toBe(14);
                    e.preventDefault();
                });

                d.on(PanGesture.PAN, function (e) {
                    expect(e.gestureType).toBe('touch');
                    move = 1;
                    expect(e.pageX).toBe(16);
                    expect(e.pageY).toBe(16);
                    e.preventDefault();
                });

                d.on(PanGesture.PAN_END, function (e) {
                    expect(e.gestureType).toBe('touch');
                    end = 1;
                    expect(e.pageX).toBe(16);
                    expect(e.pageY).toBe(16);
                    expect(e.velocityX).not.toBe(0);
                    expect(e.velocityY).not.toBe(0);
                });

                runs(function () {
                    jasmine.simulate(d[0], 'touchstart', {
                        touches: [
                            {
                                pageX: 10,
                                pageY: 10
                            }
                        ],
                        changedTouches: [
                            {
                                pageX: 10,
                                pageY: 10
                            }
                        ],
                        targetTouches: [
                            {
                                pageX: 10,
                                pageY: 10
                            }
                        ]
                    });
                });

                waits(30);
                runs(function () {
                    jasmine.simulate(d[0], 'touchmove', {
                        touches: [
                            {
                                pageX: 11,
                                pageY: 11
                            }
                        ],
                        changedTouches: [
                            {
                                pageX: 11,
                                pageY: 11
                            }
                        ],
                        targetTouches: [
                            {
                                pageX: 11,
                                pageY: 11
                            }
                        ]
                    });
                });

                waits(30);
                runs(function () {
                    jasmine.simulate(d[0], 'touchmove', {
                        touches: [
                            {
                                pageX: 14,
                                pageY: 14
                            }
                        ],
                        changedTouches: [
                            {
                                pageX: 14,
                                pageY: 14
                            }
                        ],
                        targetTouches: [
                            {
                                pageX: 14,
                                pageY: 14
                            }
                        ]
                    });
                });

                waits(100);
                runs(function () {
                    jasmine.simulate(d[0], 'touchmove', {
                        touches: [
                            {
                                pageX: 16,
                                pageY: 16
                            }
                        ],
                        changedTouches: [
                            {
                                pageX: 16,
                                pageY: 16
                            }
                        ],
                        targetTouches: [
                            {
                                pageX: 16,
                                pageY: 16
                            }
                        ]
                    });
                });

                waits(100);
                runs(function () {
                    jasmine.simulate(d[0], 'touchstart', {
                        touches: [
                            {
                                pageX: 19,
                                pageY: 19
                            },
                            {
                                pageX: 21,
                                pageY: 21
                            }
                        ],
                        changedTouches: [
                            {
                                pageX: 19,
                                pageY: 19
                            },
                            {
                                pageX: 21,
                                pageY: 21
                            }
                        ],
                        targetTouches: [
                            {
                                pageX: 19,
                                pageY: 19
                            },
                            {
                                pageX: 21,
                                pageY: 21
                            }
                        ]
                    });
                });

                waits(100);
                runs(function () {
                    jasmine.simulate(d[0], 'touchmove', {
                        touches: [
                            {
                                pageX: 22,
                                pageY: 22
                            },
                            {
                                pageX: 21,
                                pageY: 21
                            }
                        ],
                        changedTouches: [
                            {
                                pageX: 22,
                                pageY: 22
                            },
                            {
                                pageX: 21,
                                pageY: 21
                            }
                        ],
                        targetTouches: [
                            {
                                pageX: 22,
                                pageY: 22
                            },
                            {
                                pageX: 21,
                                pageY: 21
                            }
                        ]
                    });
                });

                waits(300);
                runs(function () {
                    expect(start).toBe(1);
                    expect(move).toBe(1);
                    expect(end).toBe(1);
                    d.remove();
                });
            });
        }
    });
})();