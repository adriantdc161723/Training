const dotenv = require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 9016;
const config = require('./config/config');
const dbcontext = require('./services/db.context');

//Middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));

config.authenticate()
    .then(()=>{
        config.sync({ force: false });
        console.log("Connected to Database!");
    })
    .catch(err=> console.log(err));

//Module
const StoreRouter = require('./routes/store.route');
const UserRouter = require('./routes/user.route');
const ProductRouter = require('./routes/product.route');

//Routes
app.use(StoreRouter);
app.use(UserRouter);
app.use(ProductRouter);

app.listen(PORT, err =>{
    if(err) throw err;
    console.log(`Connected to PORT ${PORT}`);
})