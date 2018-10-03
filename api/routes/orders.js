const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.status(200).json({
    message: `${req.method} request to ${req.originalUrl}`
  });
});

router.post("/", (req, res, next) => {
  res.status(201).json({
    message: `${req.method} request to ${req.originalUrl}`
  });
});

router.get("/:orderId", (req, res, next) => {
    const id = req.params.orderId;
  res.status(200).json({
    message: `${req.method} request to ${req.originalUrl} & param: ${id}`,
    orderId: id
  });
});

router.delete("/:orderId", (req, res, next) => {
    const id = req.params.orderId;
  res.status(200).json({
    message: `${req.method} request to ${req.originalUrl} & param: ${id}`,
    orderId: id
  });
});


module.exports = router;
