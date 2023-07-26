const express=require('express');
const bodyParser = require("body-parser");
const cors=require('cors')
const dotenv=require('dotenv')
dotenv.config()
const userRoute=require('./routes/userRoute')
require('./model/index');
const app=express();
let corsOptions={
  origin:"http://localhost:5173",
  credentials: true,
};
app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }));
// Parse application/json
app.use(bodyParser.json());
app.use('/api',userRoute);
let port = process.env.PORT || 5000;
app.listen(5000, (error) => {
    if (error) {
      console.error(`Error starting the server: ${error}`);
    } else {
      console.log(`Server started on port ${port}`);
    }
  });

