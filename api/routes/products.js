const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const checkAuth = require("../middleware/check-auth");
const ProductsController = require("../controllers/products");


const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function(req, file, cb) {
    // cb(null, Date.now() + file.originalname);
    // cb(
    //   null,
    //   file.fieldname +
    //   "-" +
    //   Date.now() +
    //   "-" +
    //   file.originalname.split(".").slice(0, -1) +
    //   "-" +
    //   Math.random() * (10 ** 21) +
    //   "." +
    //   file.originalname.split(".").pop()
    // );
    cb(
      null,
      file.fieldname +
      "-" +
      Date.now() +
      "-" +
      file.originalname.split(".").slice(0, -1) +
      "-" +
      Math.random() * 10 ** 21 +  // jshint ignore:line
      path.extname(file.originalname)
    );  // jshint ignore:line
  }
});
const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5 // that = 5MB
  },
  fileFilter: fileFilter
});

router.get("/", ProductsController.get_all);

router.post("/", checkAuth, upload.single("productImage"), ProductsController.create_product);

router.get("/:productId", ProductsController.get_product);

router.patch("/:productId", checkAuth, ProductsController.update_product);

router.delete("/:productId", checkAuth, ProductsController.delete_product);

module.exports = router;
