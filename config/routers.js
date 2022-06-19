const express = require("express");
const controllers = require("../app/controllers");
const middlewares = require("../app/middlewares");
const uploadOnMemory = require('../app/middlewares/uploadOnMemory.')
const upload = require('../app/middlewares/upload')
const cloudinary = require('../app/middlewares/cloudinary')

const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("../docs/swagger.json");

const appRouter = express.Router();
const apiRouter = express.Router();

/** Mount GET / handler */
appRouter.get("/", controllers.main.index);

// USER ROUTE
appRouter.post(
  "/api/v1/register",
  middlewares.checkCondition.checkCondition,
  controllers.api.v1.userController.register
);

appRouter.post(
  "/api/v1/login",
  middlewares.checkValidation.checkData,
  controllers.api.v1.userController.login
);

appRouter.put(
  "/api/v1/user/:id",
  // middlewares.checkValidation.checkData,
  controllers.api.v1.userController.update
);

// PRODUCT ROUTE  
appRouter.post(
  "/api/v1/product",
  middlewares.authorization.authorize,
  controllers.api.v1.productController.create
);

appRouter.get(
  "/api/v1/product",
  controllers.api.v1.productController.list
);

appRouter.get(
  "/api/v1/product/:id",
  middlewares.authorization.authorize,
  controllers.api.v1.productController.show
);

// appRouter.get(
//   "/api/v1/product/:category",
//   controllers.api.v1.productController.filter
// );

appRouter.put(
  "/api/v1/product/:id",
  middlewares.authorization.authorize,
  controllers.api.v1.productController.update
);

appRouter.put(
  "/api/v1/product/:id/statussold",
  middlewares.authorization.authorize,
  controllers.api.v1.productController.updateStatusSold
);

// OFFER ROUTE
appRouter.post(
  "/api/v1/offer",
  middlewares.authorization.authorize,
  controllers.api.v1.offerController.create
);

appRouter.get(
  "/api/v1/offer",
  middlewares.authorization.authorize,
  controllers.api.v1.offerController.list
);

// SALE ROUTE
appRouter.post(
  "/api/v1/sale",
  // middlewares.authorization.authorize,
  controllers.api.v1.saleController.create
);

appRouter.get(
  "/api/v1/sale",
  // middlewares.authorization.authorize,
  controllers.api.v1.saleController.list
);

// HISTORY ROUTE
appRouter.post(
  "/api/v1/history",
  middlewares.authorization.authorize,
  controllers.api.v1.historyController.create
);

appRouter.get(
  "/api/v1/history",
  // middlewares.authorization.authorize,
  controllers.api.v1.historyController.list
);

// Upload Image
appRouter.put(
  "/api/v1/users/:id/picture/cloudinary",
  uploadOnMemory.single("picture"),
  (req, res) => {
    const fileBase64 = req.file.buffer.toString("base64");
    const file = `data:${req.file.mimetype};base64,${fileBase64}`;

    cloudinary.uploader.upload(file, function (err, result) {
      if (!!err) {
        console.log(err);
        return res.status(400).json({
          message: "Gagal upload file!",
        });
      }

      res.status(201).json({
        message: "Upload image berhasil",
        url: result.url,
      });
    });
  }
);


// Open API Document
apiRouter.use("/api-docs", swaggerUi.serve);
apiRouter.get("/api-docs", swaggerUi.setup(swaggerDocument));

/**
 * TODO: Delete this, this is just a demonstration of
 *       error handler
 */
apiRouter.get("/api/v1/errors", () => {
  throw new Error(
    "The Industrial Revolution and its consequences have been a disaster for the human race."
  );
});

apiRouter.use(controllers.api.main.onLost);
apiRouter.use(controllers.api.main.onError);

/**
 * TODO: Delete this, this is just a demonstration of
 *       error handler
 */
appRouter.get("/errors", () => {
  throw new Error(
    "The Industrial Revolution and its consequences have been a disaster for the human race."
  );
});

appRouter.use(apiRouter);

/** Mount Not Found Handler */
appRouter.use(controllers.main.onLost);

/** Mount Exception Handler */
appRouter.use(controllers.main.onError);

module.exports = appRouter;

