
    var XTemplate = require('xtemplate');

    describe('sub template', function () {
        it('support parse', function () {
            KISSY.add('xtemplate-test/sub-tpl-0', '{{title}}{{title2}}');

            var tpl = '{{parse ("xtemplate-test/sub-tpl-0", title2="2")}}';

            var data = {
                title: '1'
            };

            var render = new XTemplate(tpl, {
                name: 'test-parse'
            }).render(data);

            expect(render).toBe('2');
        });

        it('support sub template as string', function () {
            var tpl = '{{include ("xtemplate-test/sub-tpl-1")}}';

            var data = {
                title: '1'
            };

            KISSY.add('xtemplate-test/sub-tpl-1', '{{title}}');

            var render = new XTemplate(tpl).render(data);

            expect(render).toBe('1');
        });

        it('support sub template compile', function () {
            var tpl = '{{include ("./x")}}';
            var code = XTemplate.Compiler.compileToStr(tpl, undefined, true);
            expect(code.indexOf('require("./x")')).not.toBe(-1);
        });

        it('support relative sub template name', function () {
            var tpl = '{{include( "./sub-tpl-3")}}';

            var data = {
                title: '1'
            };

            KISSY.add('xtemplate-test/sub-tpl-3', '{{title}}');

            var render = new XTemplate(tpl, {
                name: 'xtemplate-test/main'
            }).render(data);

            expect(render).toBe('1');
        });

        it('support unescape sub template name', function () {
            var tpl = '{{{include("./sub-tpl-3-1")}}}';

            var data = {
                title: '1'
            };

            KISSY.add('xtemplate-test/sub-tpl-3-1', '<>{{title}}');

            var render = new XTemplate(tpl, {
                name: 'xtemplate-test/main'
            }).render(data);

            expect(render).toBe('<>1');
        });

        it('allow shadow parent data', function () {
            var tpl = '{{include ("xtemplate-test/sub-tpl-5", title="2")}}';

            var data = {
                title: '1'
            };

            KISSY.add('xtemplate-test/sub-tpl-5', '{{title}}{{../title}}');

            var render = new XTemplate(tpl).render(data);

            expect(render).toBe('21');
        });

        it('throw error when relative sub template name', function () {
            var tpl = '{{include ("./sub-tpl-6")}}';

            var data = {
                title: '1'
            };

            KISSY.add('xtemplate-test/sub-tpl-6', '{{title}}');

            expect(function () {
                new XTemplate(tpl).render(data);
            }).toThrow('parent template does not have name ' +
                'for relative sub tpl name:' +
                ' ./sub-tpl-6');
        });

        it('support compiled xtemplate module', function () {

            KISSY.config('packages', {
                'xtpls': {
                    base: '/kissy/src/xtemplate/-/tests/xtpls'
                }
            });

            var ret;
            KISSY.use('xtpls/a-xtpl', function (S, A) {
                ret = new XTemplate(A).render({
                    a: 1,
                    d: 3,
                    b: {
                        c: 2
                    }
                });
            });
            waitsFor(function () {
                return !!ret;
            });
            runs(function () {
                expect(ret).toBe('123');
            });
        });
    });