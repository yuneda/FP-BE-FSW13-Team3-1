const express = require('express');
require('dotenv').config();
const swaggerUi = require('swagger-ui-express');
const controllers = require('../app/controllers');
const middlewares = require('../app/middlewares');
const uploadOnMemory = require('../app/middlewares/uploadOnMemory.');
const { multerUploads } = require('../app/middlewares/multerUpload');

const swaggerDocument = require('../docs/swagger.json');

const appRouter = express.Router();
const apiRouter = express.Router();

/** Mount GET / handler */
appRouter.get('/', controllers.main.index);

// USER ROUTE
appRouter.post(
  '/api/v1/register',
  middlewares.checkCondition.checkCondition,
  controllers.api.v1.userController.register,
);

appRouter.post(
  '/api/v1/login',
  middlewares.checkValidation.checkData,
  controllers.api.v1.userController.login,
);

appRouter.get(
  '/api/v1/user',
  middlewares.authorization.authorize,
  controllers.api.v1.userController.getData,
);

appRouter.put(
  '/api/v1/wishlist',
  middlewares.authorization.authorize,
  controllers.api.v1.userController.addWishlist,
);

appRouter.put(
  '/api/v1/deletewishlist',
  middlewares.authorization.authorize,
  controllers.api.v1.userController.deleteWishlist,
);

// Upload Image Photo User
appRouter.put(
  '/api/v1/user/:id/picture/cloudinary',
  middlewares.authorization.authorize,
  uploadOnMemory.single('picture'),
  controllers.api.v1.imageController.upload,
  controllers.api.v1.userController.update,
);

// PRODUCT ROUTE
appRouter.post(
  '/api/v1/product',
  middlewares.authorization.authorize,
  multerUploads,
  controllers.api.v1.imageController.multerUploads,
  controllers.api.v1.productController.create,
  controllers.api.v1.historyController.create,
);

// SEARCH API QUERY
appRouter.post(
  '/api/v1/product/search',
  controllers.api.v1.productController.search,
);

// Product with status available or interested
appRouter.get(
  '/api/v1/product',
  controllers.api.v1.productController.list,
);

// Product all status from id user for daftar jual page
appRouter.post(
  '/api/v1/allproduct',
  middlewares.authorization.authorize,
  controllers.api.v1.productController.haveProduct,
);

appRouter.get('/api/v1/product/:id', controllers.api.v1.productController.show);

appRouter.put(
  '/api/v1/product/:id',
  middlewares.authorization.authorize,
  controllers.api.v1.productController.update,
);

// upload file product
appRouter.put(
  '/api/v1/product/:id/picture/cloudinary',
  middlewares.authorization.authorize,
  multerUploads,
  controllers.api.v1.imageController.multerUploads,
  controllers.api.v1.productController.update,
);

// Change status product to sold
appRouter.put(
  '/api/v1/product/:id/statussold',
  middlewares.authorization.authorize,
  controllers.api.v1.productController.updateStatusSold,
);

appRouter.get(
  '/api/v1/productWishlist',
  middlewares.authorization.authorize,
  controllers.api.v1.productController.wishlist,
);

// OFFER ROUTE
appRouter.post(
  '/api/v1/offer',
  middlewares.authorization.authorize,
  controllers.api.v1.offerController.create,
  controllers.api.v1.historyController.create,
);

appRouter.get(
  '/api/v1/offer',
  middlewares.authorization.authorize,
  controllers.api.v1.offerController.list,
);

// HISTORY ROUTE
appRouter.post(
  '/api/v1/history',
  middlewares.authorization.authorize,
  controllers.api.v1.historyController.createAccOffer,
);

// history by id
appRouter.get(
  '/api/v1/history/:id',
  // middlewares.authorization.authorize,
  controllers.api.v1.historyController.show,
);

// notification
appRouter.get(
  '/api/v1/notif',
  middlewares.authorization.authorize,
  controllers.api.v1.historyController.haveNotif,
);

// Open API Document
apiRouter.use('/api-docs', swaggerUi.serve);
apiRouter.get('/api-docs', swaggerUi.setup(swaggerDocument));

/**
 * TODO: Delete this, this is just a demonstration of
 *       error handler
 */
apiRouter.get('/api/v1/errors', () => {
  throw new Error(
    'The Industrial Revolution and its consequences have been a disaster for the human race.',
  );
});

apiRouter.use(controllers.api.main.onLost);
apiRouter.use(controllers.api.main.onError);

/**
 * TODO: Delete this, this is just a demonstration of
 *       error handler
 */
appRouter.get('/errors', () => {
  throw new Error(
    'The Industrial Revolution and its consequences have been a disaster for the human race.',
  );
});

appRouter.use(apiRouter);

/** Mount Not Found Handler */
appRouter.use(controllers.main.onLost);

/** Mount Exception Handler */
appRouter.use(controllers.main.onError);

module.exports = appRouter;
