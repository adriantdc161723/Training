const ProductService = require('../services/product.service');



class ProductController{

  async getAllProductsByStoreID () {
    const response = await ProductService.getAllProductsByStoreID();
    return response;
  }

  async getProductByIDwithStoreInfo (productID) {
    const response = await ProductService.getProductByIDwithStoreInfo(productID);
    return response;
  }

  async getProducts (requestObject) {

    const offset = requestObject.offset ? parseInt(requestObject.offset) : 0;
    const limit = requestObject.limit ? parseInt(requestObject.limit) : 5;
    const sort = requestObject.sort ? requestObject.sort : "id";
    const order = requestObject.order ? requestObject.order : "ASC";

    const response = await ProductService.getProducts(offset, limit, sort, order);
    return response;
    
  }

  async createProduct (requestObject) {
    const response = await ProductService.createProduct(requestObject);
    return response;
  }
}

module.exports = new ProductController();