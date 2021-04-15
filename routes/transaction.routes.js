const { Router } = require('express')
const router = require('express').Router()
const Transaction = require("../models/transaction-model");

//Route Creat Transaction
router.post("/", (req, res) => {
    const transaction = Transaction.create(req.body, (error) => {
      if (error)
        return res.status(400).json({
          error: true,
          message: "Error: Transaction not saved, try again!",
        });
      return res.status(200).json({
        error: false,
        message: "Transaction saved!",
      });
    });
  });
  
  //Route List Transactions
  
  router.get("/", (req, res) => {
    Transaction.find()
      .then((client) => {
        return res.json(client);
      })
      .catch((error) => {
        return res.status(400)({
          error: true,
          message: "Transactions not found!",
        });
      });
  });
  
  //Route Edit Transaction
  router.put("/:id", (req, res) => {
    const transaction = Transaction.updateOne(
      { _id: req.params.id },
      req.body,
      (error) => {
        if (error)
          return res.status(400).json({
            error: true,
            message: "Error: Transaction not updated! Try again!",
          });
        return res.json({
          error: false,
          message: "Sucess! Transaction updated!",
        });
      }
    );
  });
  
  //Route Delete Transaction
  router.delete("/:id", (req, res) => {
    const transaction = Transaction.deleteOne({ _id: req.params.id }, (error) => {
      if (error)
        return res.status(400).json({
          error: true,
          message: "Error: Transaction is not deleted!",
        });
      return res.json({
        error: true,
        message: "Transaction Deleted!",
      });
    });
  });

module.exports = router