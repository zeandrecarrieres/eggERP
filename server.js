// Project dependencies:
// Express (Server) / Mongoose (MongoDB Connection) / Cors (Server permissions access)
const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors')
const cookieParser = require('cookie-parser')

//Server, enviroment variables and middlewares initialization 
require('dotenv').config()

//Routes files links
const clientRoutes =require('./routes/client.routes')
const productRoutes =require('./routes/product.routes')
const transactionRoutes =require('./routes/transaction.routes')
const userRoutes =require('./routes/user.routes')

//DB Connection (MongoDB)
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});



const app = express();
app.use(cookieParser())
// app.use(cors())
app.use(cors({
  credentials:true,
  origin: ['*']
  // origin: ['http://localhost:3001', 'http://localhost:3000', 'https://eggerp-frontend.herokuapp.com/']
}));
app.use(express.json());

//Routes
app.use('/client', clientRoutes)
app.use('/product', productRoutes)
app.use('/transaction', transactionRoutes)
app.use('/user', userRoutes)


//Enable PORT selected
app.listen(process.env.PORT, () => console.log(`Server is running on port ${process.env.PORT}`));
