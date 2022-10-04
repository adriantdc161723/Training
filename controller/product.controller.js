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

  async createProduct (requestObject) {
    const response = await ProductService.createProduct(requestObject);
    return response;
  }
}

module.exports = new ProductController();