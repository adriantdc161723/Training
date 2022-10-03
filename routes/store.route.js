const express = require('express');
const StoreRouter = express.Router();
const StoreController = require('../controller/store.controller');
const AuthService = require('../services/auth.service');

StoreRouter.get('/get-all-stores', async (req, res)=>{
    // const response = await StoreController.getAllStore();
    // return res.status(response.status).send(response);
    if(req.headers.authorization){
        const token = req.headers.authorization.split(" ")[1];
        let authenticate = await AuthService.verify(token);

        if(authenticate.status === 200){

            const response = await StoreController.getAllStore();
            return res.status(response.status).send(response);

        }else{
            return res.status(authenticate.status).send(authenticate);
        }

    }else{
        return res.status(400).send({ message: "No Token!" });
    }
});

StoreRouter.get('/get-one-store/:id', async (req, res)=>{
    const response = await StoreController.getOneStore(parseInt(req.params.id));
    return res.status(response.status).send(response);
});

StoreRouter.post('/create-store', async (req, res)=>{
    const response = await StoreController.createStore(req.body);
    return res.status(response.status).send(response);
});

StoreRouter.put('/update-store', async (req, res)=>{
    const response = await StoreController.updateStore(req.body);
    return res.status(response.status).send(response);
});

StoreRouter.delete('/delete-store/:id', async (req, res)=>{
    const response = await StoreController.deleteStore(parseInt(req.params.id));
    return res.status(response.status).send(response);
});


module.exports = StoreRouter;