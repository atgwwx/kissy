
    var util = require('util');
    var LoggerManager = require('logger-manager');
    var tpl = '<h2 class="anim-title">{title}</h2>' +
        '<p class="anim-content">Sed ut perspiciatis unde omnis iste natus error ' +
        'sit voluptatem accusantium doloremque laudantium, ' +
        'totam rem aperiam, eaque ipsa quae ab illo inventore ' +
        'veritatis et quasi architecto beatae vitae dicta sunt ' +
        'explicabo. Nemo enim ipsam voluptatem quia voluptas sit ' +
        'aspernatur aut odit aut fugit, sed quia consequuntur magni ' +
        'dolores eos qui ratione voluptatem sequi nesciunt. Neque porro ' +
        'quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, ' +
        'adipisci velit, sed quia non numquam eius modi tempora incidunt ut ' +
        'labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima ' +
        'veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, ' +
        'nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum ' +
        'iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae ' +
        'consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?</p>';

    tpl += tpl;
    tpl += tpl;
    tpl += tpl;

    function Loading(page) {
        this.page = page;
        page.on('leave', this.leave, this);
        page.on('destroy', this.destroy, this);
    }

    Loading.prototype = {
        enter: function () {
            var page = this.page;
            setTimeout(function () {
                page.getContentEl().html(util.substitute(tpl, {
                    title: page.get('viewId')
                }));
                page.sync();
                page.defer.resolve();
            }, 1400);
        },
        leave: function () {
            LoggerManager.log('leave loading');
        },
        destroy: function () {
            LoggerManager.log('destroy loading');
        }
    };

    module.exports = Loading;