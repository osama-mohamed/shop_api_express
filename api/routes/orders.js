const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Order = require("../models/orders");
const Product = require("../models/products");

router.get("/", (req, res, next) => {
  Order.find()
    .select("_id product quantity")
    .populate('product', "_id name price")
    .exec()
    .then(docs => {
      res.status(201).json({
        message: "Your all orders",
        count: docs.length,
        orders: docs.map(doc => {
          return {
            _id: doc._id,
            product: doc.product,
            quantity: doc.quantity,
            request: {
              type: "GET",
              url:
                "http://" + req.headers.host + req.originalUrl + "/" + doc._id
            }
          };
        })
      });
    })
    .catch(error => {
      res.status(500).json({
        error: error
      });
    });
});

router.post("/", (req, res, next) => {
  Product.findById(req.body.productId)
    .then(product => {
      if (!product) {
        return res.status(404).json({
          message: "product not found"
        });
      }
      const order = new Order({
        _id: mongoose.Types.ObjectId(),
        product: req.body.productId,
        quantity: req.body.quantity
      });
      order
        .save()
        .then(result => {
          res.status(201).json({
            message: "Your order has been set successfully",
            createdOrder: {
              _id: result._id,
              product: result.product,
              quantity: result.quantity
            },
            request: {
              type: "GET",
              url:
                "http://" +
                req.headers.host +
                req.originalUrl +
                "/" +
                result._id
            }
          });
        })
        .catch(error => {
          res.status(500).json({
            error: error
          });
        });
    })
    .catch(error => {
      res.status(500).json({
        message: "Product not found",
        error: error
      });
    });
});

router.get("/:orderId", (req, res, next) => {
  Order.findById(req.params.orderId)
    .select("_id product quantity")
    .populate('product', "_id name price")
    .exec()
    .then(order => {
      if (!order) {
        return res.status(404).json({
          message: "Order not found",
          error: error
        });
      }
      res.status(200).json({
        message: "Order detail",
        order: order,
        request: {
          type: "GET",
          url: "http://" + req.headers.host + "/api/orders"
        }
      });
    })
    .catch(error => {
      res.status(500).json({
        message: "Order not found",
        error: error
      });
    });
});

router.delete("/:orderId", (req, res, next) => {
  Order.deleteOne({ _id: req.params.orderId })
    .exec()
    .then(result => {
      res.status(200).json({
        message: `Order deleted`,
        request: {
          type: "POST",
          url: "http://" + req.headers.host + "/api/orders",
          body: {
            productId: 'ID',
            quantity: 'Number'
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

module.exports = router;
