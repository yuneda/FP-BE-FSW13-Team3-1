const jwt = require('jsonwebtoken')
const userService = require("../services/userService")

module.exports = {
  async authorize(req, res, next) {
    try {
      const bearerToken = req.headers.authorization
      const token = bearerToken.split("Bearer ")[1]
      const tokenPayload = jwt.verify(
        token,
        process.env.JWT_PRIVATE_KEY || "rahasia"
      );

      req.user = await userService.get(tokenPayload.id);
      next();
    } catch (err) {
      res.status(401).json({
        error: err.message,
        message: "Harap login terlebih dahulu"
      });
    }
  },

  // async checkSameIdOrAdmin(req, res, next) {
  //   try {
  //     const id = req.params.id;
  //     const bearerToken = req.headers.authorization
  //     const token = bearerToken.split("Bearer ")[1]
  //     const tokenPayload = jwt.verify(
  //       token,
  //       process.env.JWT_PRIVATE_KEY || "rahasia"
  //     );

  //     req.user = await userService.get(tokenPayload.id);
  //     const compareId = id == req.user.id;

  //     if (!compareId) {
  //       if (!req.user.isAdmin) {
  //         res.status(401).json({
  //           status: "FAIL",
  //           message: "Akses hanya pemilik, admin, atau superadmin"
  //         });
  //         return;
  //       }
  //     }

  //     next();
  //   } catch (err) {
  //     res.status(401).json({
  //       error: err.message,
  //       message: "Harap login terlebih dahulu"
  //     });
  //   }
  // },

  // async checkSuperAdmin(req, res, next) {
  //     try {
  //         const bearerToken = req.headers.authorization
  //         const token = bearerToken.split("Bearer ")[1]
  //         const tokenPayload = jwt.verify(
  //             token,
  //             process.env.JWT_PRIVATE_KEY || "rahasia"
  //         );

  //         req.user = await userService.get(tokenPayload.id);
  //         if (!req.user.isSuperAdmin) {
  //             res.status(401).json({
  //                 status: 'FAIL',
  //                 message: 'Bukan superadmin!'
  //             })
  //             return;
  //         }
  //         next();
  //     } catch (err) {
  //         res.status(401).json({
  //             error: err.message,
  //             message: "Harap login terlebih dahulu"
  //         });
  //     }
  // },

  // async checkAdmin(req, res, next) {
  //     try {
  //         const bearerToken = req.headers.authorization
  //         const token = bearerToken.split("Bearer ")[1]
  //         const tokenPayload = jwt.verify(
  //             token,
  //             process.env.JWT_PRIVATE_KEY || "rahasia"
  //         );

  //         req.user = await userService.get(tokenPayload.id);
  //         if (!req.user.isAdmin) {
  //             res.status(401).json({
  //                 status: 'FAIL',
  //                 message: 'Bukan Admin!'
  //             })

  //             return;
  //         }
  //         next();
  //     } catch (err) {
  //         res.status(401).json({
  //             error: err.message,
  //             message: "Harap login terlebih dahulu"
  //         });
  //     }
  // },
}