const express = require("express");
const router = express.Router();
const Product = require("../models/products");
const mongoose = require("mongoose");

router.get("/", (req, res, next) => {
  Product.find({})
    .select("_id name price")
    .exec()
    .then(docs => {
      if (docs.length > 0) {
        res.status(200).json({
          count: docs.length,
          products: docs.map(doc => {
            return {
              _id: doc._id,
              name: doc.name,
              price: doc.price,
              request: {
                type: "GET",
                url: "http://" + req.headers.host + req.originalUrl + doc._id
              }
            };
          })
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
        message: "Created product successfully",
        createdProduct: {
          _id: result._id,
          name: result.name,
          price: result.price,
          request: {
            type: "GET",
            url: "http://" + req.headers.host + req.originalUrl + result._id
          }
        }
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
    .select("_id name price")
    .exec()
    .then(doc => {
      if (doc) {
        res.status(200).json({
          product: doc,
          request: {
            type: 'GET',
            description: 'Get all products',
            url: "http://" + req.headers.host + '/api/products'
          }
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
        message: 'Product updated successfully',
        productEdited: result,
        request: {
          type: 'GET',
          description: 'Show product',
          url: "http://" + req.headers.host + req.originalUrl
        }
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
        message: 'Product deleted successfully',
        productDeleted: result,
        request: {
          type: 'POST',
          description: 'New product',
          url: "http://" + req.headers.host + '/products',
          body: { name: 'String', price: 'Number' }
        }

      });
    })
    .catch(error => {
      res.status(500).json({
        error: error
      });
    });
});

module.exports = router;
