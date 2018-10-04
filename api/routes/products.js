const express = require("express");
const router = express.Router();
const Product = require("../models/products");
const mongoose = require("mongoose");

router.get("/", (req, res, next) => {
  Product.find({})
    .exec()
    .then(docs => {
      if (docs.length > 0) {
        res.status(200).json({
          products: docs
        });
      } else {
        res.status(404).json({
          message: "No products found!"
        });
      }
    })
    .catch(error => {
      res.status(500).json({
        error: error
      });
    });
});

router.post("/", (req, res, next) => {
  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    price: req.body.price
  });
  product
    .save()
    .then(result => {
      res.status(201).json({
        createdProduct: result
      });
    })
    .catch(error => {
      res.status(500).json({
        error: error
      });
    });
});

router.get("/:productId", (req, res, next) => {
  const id = req.params.productId;
  Product.findById(id)
    .exec()
    .then(doc => {
      if (doc) {
        res.status(200).json({
          product: doc
        });
      } else {
        res.status(404).json({
          message: "Not a valid ID!"
        });
      }
    })
    .catch(error => {
      res.status(500).json({
        error: error
      });
    });
});

router.patch("/:productId", (req, res, next) => {
  const id = req.params.productId;
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  Product.updateOne({ _id: id }, { $set: updateOps })
    .exec()
    .then(result => {
      res.status(200).json({
        productEdited: result
      });
    })
    .catch(error => {
      res.status(500).json({
        error: error
      });
    });
});

router.delete("/:productId", (req, res, next) => {
  const id = req.params.productId;
  Product.deleteOne({ _id: id })
    .exec()
    .then(result => {
      res.status(200).json({
        productDeleted: result
      });
    })
    .catch(error => {
      res.status(500).json({
        error: error
      });
    });
});

module.exports = router;
