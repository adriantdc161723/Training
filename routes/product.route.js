const express = require('express');
const ProductRouter = express.Router();
const ProductController = require('../controller/product.controller');
const AuthService = require('../services/auth.service');

ProductRouter.get('/get-all-products-by-store-id', async (req, res)=>{
 


    if(req.headers.authorization){
        const token = req.headers.authorization.split(" ")[1];
        let authenticate = await AuthService.verify(token);

        if(authenticate.status === 200){

            let response = await ProductController.getAllProductsByStoreID();
            return res.status(response.status).send(response);

        }else{
            return res.status(authenticate.status).send(authenticate);
        }

    }else{
        return res.status(400).send({ message: "No Token!" });
    }

});


ProductRouter.post('/get-product-by-id-with-store-info/:id', async (req, res)=>{
    

    if(req.headers.authorization){
        const token = req.headers.authorization.split(" ")[1];
        let authenticate = await AuthService.verify(token);

        if(authenticate.status === 200){

            let response = await ProductController.getProductByIDwithStoreInfo(parseInt(req.params.id));
            return res.status(response.status).send(response);

        }else{
            return res.status(authenticate.status).send(authenticate);
        }

    }else{
        return res.status(400).send({ message: "No Token!" });
    }

});

ProductRouter.get('/get-products', async (req, res)=>{
    const response = await ProductController.getProducts(req.query);
    return res.status(response.status).send(response);
});

ProductRouter.post('/create-product', async (req, res)=>{
    const response = await ProductController.createProduct(req.body);
    return res.status(response.status).send(response);
});


module.exports = ProductRouter;