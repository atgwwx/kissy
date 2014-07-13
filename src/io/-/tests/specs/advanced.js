/**
 * advanced io tc
 * @author yiminghe@gmail.com
 **/
    var io = require('io');
    var util = require('util');
    var $ = require('node');
    var UA = require('ua');
    var Json = require('json');
    var url = require('url');


    /*jshint quotmark:false*/

    describe("Advanced IO", function () {

        it('support custom contentType', function () {
            var done = 0, ok = 0;
            io({
                url: '/kissy/src/io/-/tests/data/receive-json.jss',
                dataType: 'json',
                type: 'post',
                contentType: 'application/json',
                data: Json.stringify({
                    x: 1
                }),
                success: function (t) {
                    expect(t.x).toBe(1);
                    ok = 1;
                },
                complete: function () {
                    done = 1;
                }
            });

            waitsFor(function () {
                return done;
            });

            runs(function () {
                expect(ok).toBe(1);
            });

        });

        it("should support last-modified from server", function () {
            var ok = 0;

            io({
                url: '/kissy/src/io/-/tests/data/ifModified.jss',
                dataType: "text",
                success: function (data, status, xhr) {
                    expect(data).toBe("haha");
                    expect(status).toBe("success");
                    expect(xhr.status).toBe(200);
                    io({
                        url: '/kissy/src/io/-/tests/data/ifModified.jss',
                        dataType: "text",
                        success: function (data, status, xhr) {
                            expect(data).toBe("haha");
                            expect(status).toBe("success");
                            expect(xhr.status).toBe(200);


                            expect(util.isEmptyObject(
                                io.__lastModifiedCached)).toBe(true);


                            ok = 1;
                        }
                    });
                }
            });

            waitsFor(function () {
                return ok;
            });

        });


        it("should support ifModified config", function () {

            var ok = 0;

            io({
                url: '/kissy/src/io/-/tests/data/ifModified.jss',
                dataType: "text",
                cache: false,
                ifModified: true,
                success: function (data, status, xhr) {
                    expect(data).toBe("haha");
                    expect(status).toBe("success");
                    expect(xhr.status).toBe(200);
                    io({
                        url: '/kissy/src/io/-/tests/data/ifModified.jss',
                        dataType: "text",
                        cache: false,
                        ifModified: true,
                        success: function (data, status, xhr) {
                            if (status === 'not modified') {
                                expect(data).toBe(null);
                                expect(xhr.status).toBe(304);
                                expect(status).toBe("not modified");

                                expect(io.__lastModifiedCached[
                                    url.resolve(location.href,'/kissy/src/io/-/tests/data/ifModified.jss')
                                    ])
                                    .toBe('Thu, 18 Jul 2002 15:48:32 GMT');
                            }
                            ok = 1;
                        }
                    });
                }
            });

            waitsFor(function () {
                return ok;
            });

        });


        it("should support ifModified config for form", function () {
            var ok = 0;

            var form = $("<form><input name='t' value='t'/></form>").appendTo('body');

            io({
                url: '/kissy/src/io/-/tests/data/ifModified.jss',
                dataType: "text",
                cache: false,
                ifModified: true,
                form: form,
                success: function (data, status, xhr) {
                    expect(data).toBe("haha");
                    expect(status).toBe("success");
                    expect(xhr.status).toBe(200);
                    io({
                        url: '/kissy/src/io/-/tests/data/ifModified.jss',
                        dataType: "text",
                        cache: false,
                        form: form,
                        ifModified: true,
                        success: function (data, status, xhr) {
                            if (status === 'not modified') {
                                expect(data).toBe(null);
                                expect(xhr.status).toBe(304);
                                expect(status).toBe("not modified");

                                var uri = url.parse(url.resolve(location.href,'/kissy/src/io/-/tests/data/ifModified.jss'));
                                uri.query={
                                    t:'t'
                                };

                                expect(io.__lastModifiedCached[
                                    url.stringify(uri)
                                    ]).toBe('Thu, 18 Jul 2002 15:48:32 GMT');
                            }
                            ok = 1;
                        }
                    });
                }
            });

            waitsFor(function () {
                return ok;
            });

            runs(function () {
                form.remove();
            });

        });

        it("should jsonp with array arguments", function () {
            var re = false, data;

            io.jsonp("/kissy/src/io/-/tests/data/jsonp-array.jss", function (d) {
                re = true;
                data = d;
            });

            waitsFor(function () {
                return re;
            });

            runs(function () {
                expect(data.join(",")).toBe([1, 2].join(","));
            });

        });

        it("should abort for xhr", function () {
            var re = [];
            var xhr = io({
                url: '/kissy/src/io/-/tests/data/io.jss',
                cache: false,
                success: function (data, status) {
                    re.push(status);
                },
                error: function (data, status) {
                    re.push(status);
                },
                complete: function (data, status) {
                    re.push(status);
                }
            });

            xhr.abort();

            waits(100);

            runs(function () {
                expect(re.toString()).toBe(["abort", "abort"].toString());
            });
        });


        it("nothing happens if abort xhr after complete", function () {
            var re = [], ok = false;

            var xhr = io({
                url: '/kissy/src/io/-/tests/data/io.jss',
                cache: false,
                success: function (data, status) {
                    ok = true;
                    re.push(status);
                },
                error: function (data, status) {
                    re.push(status);
                },
                complete: function (data, status) {
                    re.push(status);
                }
            });

            waitsFor(function () {
                return ok;
            }, 10000);


            runs(function () {
                // 成功后 abort 无影响
                xhr.abort();
                expect(re.toString()).toBe(["success", "success"].toString());
            });

        });


        it("should abort for jsonp", function () {
            var re = [];

            var xhr = io({
                forceScript: UA.ie !== 6,
                dataType: 'jsonp',
                url: '/kissy/src/io/-/tests/data/jsonp.jss',
                cache: false,
                success: function (data, status) {
                    re.push(status);
                },
                error: function (data, status) {
                    re.push(status);
                },
                complete: function (data, status) {
                    re.push(status);
                }
            });

            xhr.abort();

            waits(100);

            runs(function () {
                expect(re.toString()).toBe(["abort", "abort"].toString());
            });
        });


        it("nothing happens if abort jsonp after complete", function () {
            var re = [], ok;

            var xhr = io({
                forceScript: UA.ie !== 6,
                url: '/kissy/src/io/-/tests/data/io.jss',
                cache: false,
                success: function (data, status) {
                    ok = true;
                    re.push(status);
                },
                error: function (data, status) {
                    re.push(status);
                },
                complete: function (data, status) {
                    re.push(status);
                }
            });


            waitsFor(function () {
                return ok;
            }, 10000);

            runs(function () {
                // 成功后 abort 无影响
                xhr.abort();
                expect(re.toString()).toBe(["success", "success"].toString());
            });

        });

        it("timeout should work for xhr", function () {
            var re = [], ok;
            io({
                url: '/kissy/src/io/-/tests/data/io.jss',
                // ie 默认会缓存，可能直接触发 success
                // fiddler 看不到请求，自带网络捕获为 304
                cache: false,
                dataType: 'json',
                timeout: 0.01,
                success: function (d, status) {
                    re.push(status);
                },
                error: function (data, status) {
                    re.push(status);
                },
                complete: function (data, status) {
                    ok = true;
                    re.push(status);
                }
            });

            waitsFor(function () {
                return ok;
            }, 10000);

            runs(function () {
                expect(re.toString()).toBe(["timeout", "timeout"].toString());
            });
        });


        it("should works for form file upload", function () {
            var f = $('<form id="f' + util.guid((+new Date())) + '">' +
                //php need []
                '<input name="test4[]" value="t6"/>' +
                '<input name="test4[]" value="t7"/>' +
                '<input name="test5" value="t8"/>' +
                '<input name="testFile" type="file"/>' +
                '<select name="test[]" multiple>' +
                '<option value="t1" selected>v</option>' +
                '<option value="t2" selected>v2</option>' +
                '</select>' +
                '</form>').appendTo('body');


            var ok, d;

            io({
                url: '/kissy/src/io/-/tests/others/form/upload.jss',
                form: "#" + f.prop('id'),
                type: 'post',
                dataType: 'json',
                data: {
                    "test2": ["t2", "t3"],
                    "test3": "t4"
                },
                success: function (data) {
                    ok = true;
                    d = data;
                },
                complete: function () {
                    ok = true;
                }
            });

            waitsFor(function () {
                return ok;
            });

            runs(function () {
                expect(d.test + "").toBe(["t1", "t2"] + "");
                expect(d.test4 + "").toBe(["t6", "t7"] + "");
                expect(d.test2 + "").toBe(["t2", "t3"] + "");
                expect(d.test3 + "").toBe("t4");
                expect(d.test5 + "").toBe("t8");
            });
        });


        it("should works for common form", function () {
            var f = $('<form id="f' + util.guid((+new Date())) + '">' +
                '<input name="test4[]" value="t6"/>' +
                '<input name="test4[]" value="t7"/>' +
                '<input name="test5" value="t8"/>' +
                '<select name="test[]" multiple>' +
                '<option value="t1" selected>v</option>' +
                '<option value="t2" selected>v2</option>' +
                '</select>' +
                '</form>').appendTo('body');

            var ok, d;
            io({
                url: '/kissy/src/io/-/tests/others/form/upload.jss',
                form: "#" + f.prop('id'),
                type: 'post',
                dataType: 'json',
                data: {
                    "test2": ["t2", "t3"],
                    "test3": "t4"
                },
                success: function (data) {
                    ok = true;
                    d = data;
                },
                complete: function () {
                    ok = true;
                }
            });

            waitsFor(function () {
                return ok;
            });

            runs(function () {
                expect(d.test + "").toBe(["t1", "t2"] + "");
                expect(d.test4 + "").toBe(["t6", "t7"] + "");
                expect(d.test2 + "").toBe(["t2", "t3"] + "");
                expect(d.test3 + "").toBe("t4");
                expect(d.test5 + "").toBe("t8");
            });
        });
    });