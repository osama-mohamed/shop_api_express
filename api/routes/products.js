const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.status(200).json({
    message: `${req.method} request to ${req.originalUrl}`
  });
});

router.post("/", (req, res, next) => {
  const product = {
    name: req.body.name,
    price: req.body.price,
  };
  res.status(201).json({
    message: `${req.method} request to ${req.originalUrl}`,
    createdProduct: product
  });
});

router.get("/:productId", (req, res, next) => {
  const id = req.params.productId;
  if (id === "osama") {
    res.status(200).json({
      message: `${req.method} request to ${req.originalUrl} & param: ${id} mohamed - full-stack developer`,
      id: id
    });
  } else {
    res.status(200).json({
      message: `${req.method} request to ${req.originalUrl} & param: ${id}`,
      id: id
    });
  }
});

router.patch("/:productId", (req, res, next) => {
  const id = req.params.productId;
  res.status(200).json({
    message: `${req.method} request to ${req.originalUrl} & param: ${id}`,
    id: id
  });
});

router.delete("/:productId", (req, res, next) => {
  const id = req.params.productId;
  res.status(200).json({
    message: `${req.method} request to ${req.originalUrl} & param: ${id}`,
    id: id
  });
});

module.exports = router;
