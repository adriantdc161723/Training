const UserService = require('../services/user.service');


class UserController {
    async login(requestObject){
        try {
            const response = await UserService.login(requestObject);
            return response;
        } catch (error) {
            return this.RESPONSE(INTERNAL_SERVER_ERROR, error.message, INTERNAL_SERVER_ERROR_MESSAGE);  
        }
    }

    async signup(requestObject){
        try {
            const response = await UserService.signup(requestObject);
            return response;
        } catch (error) {
            return this.RESPONSE(INTERNAL_SERVER_ERROR, error.message, INTERNAL_SERVER_ERROR_MESSAGE);  
        }
    }
}


module.exports = new UserController();