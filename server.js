const express = require("express");
const mongoose = require("mongoose");
const Client = require("./models/client-model");
const Product = require("./models/product-model");
const Transaction = require("./models/transactions-model");
const cors = require("cors");
const PORT = process.env.PORT || 3001

mongoose.connect("mongodb://localhost/eggerp", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const app = express();
app.use(express.json());
app.use(cors());

// ===================================== CLIENTS ROUTES ===============================================

//Route Creat Client
app.post("/client", (req, res) => {
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

app.get("/client", (req, res) => {
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
app.put("/client/:id", (req, res) => {
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
app.delete("/client/:id", (req, res) => {
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

// ===================================== PRODUCT ROUTES ===============================================

//Route Creat Product
app.post("/product", (req, res) => {
  const product = Product.create(req.body, (error) => {
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

//Route List Products

app.get("/product", (req, res) => {
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
app.put("/product/:id", (req, res) => {
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
app.delete("/client/:id", (req, res) => {
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

// ===================================== TRANSACTIONS ROUTES ===============================================

//Route Creat Transaction
app.post("/transaction", (req, res) => {
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

app.get("/transaction", (req, res) => {
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
app.put("/transaction/:id", (req, res) => {
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
app.delete("/transaction/:id", (req, res) => {
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

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
