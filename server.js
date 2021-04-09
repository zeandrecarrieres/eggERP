const express = require("express");
const mongoose = require("mongoose");
const Client = require("./models/client-model");
const cors = require('cors')

mongoose.connect("mongodb://localhost/eggerp", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const app = express();
app.use(express.json());
app.use(cors())

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
app.put('/client/:id', (req, res)=>{
  const client = Client.updateOne({_id: req.params.id}, req.body, (error)=>{
      if(error) return res.status(400).json({
          error: true,
          message: "Error: Client not updated! Try again!"
      })
      return res.json({
          error: false,
          message: "Sucess! Client updated!"
      })
  })
})

//Route Delete Client
app.delete("/client/:id", (req, res)=>{
	const client = Client.deleteOne({_id: req.params.id}, (error)=>{
		if(error) return res.status(400).json({
			error:true,
			message: "Error: Registry is not deleted!"
			})
		return res.json({
			error: true,
			message: "Deleted!"
		})
	})
})

app.listen(3001);
