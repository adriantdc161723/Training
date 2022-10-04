const Response = require('../utils/response.util');
const Products = require('../models/Products');
const Store = require('../models/Store');

const {OK, NOTFOUND, BADREQUEST, CREATED, UPDATE, INTERNAL_SERVER_ERROR} = require('../utils/constants.util');
const {OK_MESSAGE, NOTFOUND_MESSAGE, BADREQUEST_MESSAGE, CREATED_MESSAGE, UPDATE_MESSAGE, INTERNAL_SERVER_ERROR_MESSAGE, PRODUCT_DOES_NOT_EXIST} = require('../utils/message.util');

class ProductService extends Response{
    async getAllProductsByStoreID () {
        
        try {

            const exist = await Store.findAll({ 
                include: { 
                    model: Products, 
                    as: 'product_item', 
                    attributes: {
                        exclude: ['createdAt', 'updatedAt']
                    }},
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                } });

            if(exist){

                return this.RESPONSE(OK, exist, OK_MESSAGE);
            }else{
                return this.RESPONSE(BADREQUEST, {}, PRODUCT_DOES_NOT_EXIST);
            }

        } catch (error) {
            return this.RESPONSE(INTERNAL_SERVER_ERROR, error.message, INTERNAL_SERVER_ERROR_MESSAGE);
        }
    }


    async getProductByIDwithStoreInfo (productID) {
        
        try {

           const exist = await Products.findOne({
                where: { id: productID },
                include: { model: Store, as: "store_info" }
            });
            
            if(exist){

                return this.RESPONSE(OK, exist, OK_MESSAGE);
            }else{
                return this.RESPONSE(BADREQUEST, {}, PRODUCT_DOES_NOT_EXIST);
            }

        } catch (error) {
            return this.RESPONSE(INTERNAL_SERVER_ERROR, error.message, INTERNAL_SERVER_ERROR_MESSAGE);
        }
    }


    async createProduct (requestObject) {

        try {

            const create = await Products.create(requestObject);
            if(create){
                return this.RESPONSE(CREATED, create, CREATED_MESSAGE);
            }else{
                return this.RESPONSE(BADREQUEST, create, BADREQUEST_MESSAGE);
            }

        } catch (error) {
             return this.RESPONSE(INTERNAL_SERVER_ERROR, error.message, INTERNAL_SERVER_ERROR_MESSAGE);
        }
    }

}


module.exports = new ProductService;