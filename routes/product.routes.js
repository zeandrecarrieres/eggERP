const { Router } = require('express')
const router = require('express').Router()
const Product = require("../models/product-model");

//Route Creat Product
router.post("/", (req, res) => {
    const product = Product.create(req.body, (error) => {
      if (error)
        return res.status(400).json({
          error: true,
          message: "Error: Product not saved, try again!",
        });
      return res.status(200).json({
        error: false,
        message: "Product saved!",
      });
    });
  });
  
  //Route List Products
  
  router.get("/", (req, res) => {
    Product.find()
      .then((client) => {
        return res.json(client);
      })
      .catch((error) => {
        return res.status(400)({
          error: true,
          message: "Registry not found!",
        });
      });
  });
  
  //Route Edit Product
  router.put("/:id", (req, res) => {
    const product = Product.updateOne(
      { _id: req.params.id },
      req.body,
      (error) => {
        if (error)
          return res.status(400).json({
            error: true,
            message: "Error: Product not updated! Try again!",
          });
        return res.json({
          error: false,
          message: "Sucess! Product updated!",
        });
      }
    );
  });
  
  //Route Delete Product
  router.delete("/:id", (req, res) => {
    const product = Product.deleteOne({ _id: req.params.id }, (error) => {
      if (error)
        return res.status(400).json({
          error: true,
          message: "Error: Registry is not deleted!",
        });
      return res.json({
        error: false,
        message: "Deleted!",
      });
    });
  });

  module.exports = router