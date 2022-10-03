const express = require('express');
const UserRouter = express.Router();
const UserController = require('../controller/user.controller');


UserRouter.post('/user-login', async (req, res)=>{
    const response = await UserController.login(req.body);
    return res.status(response.status).send(response);
});


UserRouter.post('/user-signup', async (req, res)=>{
    const response = await UserController.signup(req.body);
    return res.status(response.status).send(response);
});


module.exports = UserRouter;