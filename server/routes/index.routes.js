const router = require('express').Router();
const authApiRouter = require('./api/authApi')
const mainpageApi = require('./api/mainpageApi')
const userApiRouter = require('./api/userApi')
const commentsApi = require('./api/commentApi')
const brandApiRouter = require('./api/brandApi')
const currencyApiRouter = require('./api/currencyApi')
const hashrateApiRouter = require('./api/hashrateApi')
const algorithmApiRouter = require('./api/algorithmApi')
const modellsApiRouter = require('./api/modellsApi')
const subbrandsApiRouter = require('./api/subbransdApi')
const ordersApiRouter = require('./api/orderApi');
const favoriteApiRouter = require('./api/favoriteApi');
const deliveryApiRouter = require('./api/deliveryApi');
const serviceApiRouter = require('./api/serviceApi');
const postsApiRouter = require('./api/postApi');


router.use('/api', mainpageApi);
router.use('/api/auth', authApiRouter);
router.use('/api/profile', userApiRouter);
router.use('/api/brands', brandApiRouter);
router.use('/api/miners', mainpageApi);
router.use('/api/comments', commentsApi);
router.use('/api/currencies', currencyApiRouter);
router.use('/api/hashrates', hashrateApiRouter);
router.use('/api/algorithms', algorithmApiRouter);
router.use('/api/modells', modellsApiRouter);
router.use('/api/subbrands', subbrandsApiRouter);
router.use('/api/order', ordersApiRouter);
router.use('/api/favorite', favoriteApiRouter);
router.use('/api/delivery', deliveryApiRouter);
router.use('/api/service', serviceApiRouter);
router.use('/api/posts', postsApiRouter);





module.exports = router