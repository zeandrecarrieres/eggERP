const express = require("express");
const mongoose = require("mongoose");
const clientRoutes =require('./routes/client.routes')
const productRoutes =require('./routes/product.routes')
const transactionRoutes =require('./routes/transaction.routes')

const cors = require("cors");
require('dotenv').config()


mongoose.connect(process.env.MONGODB_LOCAL_KEY, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const app = express();
app.use(express.json());
app.use(cors());
app.use('/client', clientRoutes)
app.use('/product', productRoutes)
app.use('/transaction', transactionRoutes)

app.listen(process.env.PORT, () => console.log(`Server is running on port ${process.env.PORT}`));
