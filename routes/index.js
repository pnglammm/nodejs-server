const siteRouter = require('./site');
const managerRouter = require('./manager');
const productRouter = require('./product');
const userRouter = require('./user');
const registerRouter = require('./register');
const loginRouter = require('./login');

function route(app) {

    app.use('/', siteRouter);

    app.use('/manager', managerRouter);

    app.use('/product', productRouter);

    app.use('/user', userRouter);

    // Register => login
    app.use('/login', registerRouter);

    // Login => Index
    app.use('/', loginRouter);
}

module.exports = route;