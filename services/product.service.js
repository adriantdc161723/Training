const Response = require('../utils/response.util');
const Products = require('../models/Store');

const {OK, NOTFOUND, BADREQUEST, CREATED, UPDATE, INTERNAL_SERVER_ERROR} = require('../utils/constants.util');
const {OK_MESSAGE, NOTFOUND_MESSAGE, BADREQUEST_MESSAGE, CREATED_MESSAGE, UPDATE_MESSAGE, INTERNAL_SERVER_ERROR_MESSAGE} = require('../utils/message.util');

class ProductService extends Response{
 
}


module.exports = new ProductService;