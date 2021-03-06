/**
 * 导出声明
 */

const jwt = require('jsonwebtoken');
const utility = require('../utility');
const context = {};

module.exports = (obj) => {
    Object.assign(context, obj);
    return {
        name: 'verify',
        method: 'GET',
        path: '/verify',
        middleware: verifyRoute
    };
};


/**
 * 验证接口
 * @param {object} ctx
 */
async function verifyRoute(ctx) {
    const options = context.options;
    try {
        const token = utility.tokenFromRequest(ctx, options);
        const decoded = jwt.verify(token, options.secretOrPrivateKey, options.signOpts);
        ctx.body = { data: decoded };
    } catch (error) {
        ctx.body = {
            errcode: 500,
            errmsg: context.getLocaleString('ibird_accounts_error_verify'),
            errstack: error.message
        };
    }
}