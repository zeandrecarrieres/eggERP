const { Router } = require('express')
const router = require('express').Router()
const Client = require("../models/client-model")

//Route Create Client 
router.post("/", (req, res) => {
  const client = Client.create(req.body, (error) => {
    if (error)
      return res.status(400).json({
        error: true,
        message: "Error: Client not saved, try again!",
      });
    return res.status(200).json({
      error: false,
      message: "Client saved!",
    });
  });
});

//Route List Clients 

router.get("/", (req, res) => {
  Client.find()
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

//Route Edit Client
router.put("/client/:id", (req, res) => {
  const client = Client.updateOne({ _id: req.params.id }, req.body, (error) => {
    if (error)
      return res.status(400).json({
        error: true,
        message: "Error: Client not updated! Try again!",
      });
    return res.json({
      error: false,
      message: "Sucess! Client updated!",
    });
  });
});

//Route Delete Client
router.delete("/:id", (req, res) => {
  const client = Client.deleteOne({ _id: req.params.id }, (error) => {
    if (error)
      return res.status(400).json({
        error: true,
        message: "Error: Registry is not deleted!",
      });
    return res.json({
      error: true,
      message: "Deleted!",
    });
  });
});

 
module.exports = router