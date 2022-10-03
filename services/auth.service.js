const dotenv = require('dotenv').config();
const jwt = require('jsonwebtoken');
const Response = require('../utils/response.util');
const {OK, NOTFOUND, BADREQUEST, CREATED, UPDATE, INTERNAL_SERVER_ERROR} = require('../utils/constants.util');
const {OK_MESSAGE, NOTFOUND_MESSAGE, BADREQUEST_MESSAGE, CREATED_MESSAGE, UPDATE_MESSAGE, INTERNAL_SERVER_ERROR_MESSAGE} = require('../utils/message.util');


class AuthService extends Response{
    async auth(requestObject){
        try {
            const authentication = jwt.sign(requestObject, process.env.SECRET_KEY);
            if(authentication){
                return this.RESPONSE(OK, {accessToken:  authentication }, OK_MESSAGE);
            }else{
                return this.RESPONSE(BADREQUEST, {}, BADREQUEST_MESSAGE);
            }
        } catch (error) {
            return this.RESPONSE(INTERNAL_SERVER_ERROR, error.message, INTERNAL_SERVER_ERROR_MESSAGE);
        }
    }

    async verify(token){
        try {
            let authentication = jwt.verify(token, process.env.SECRET_KEY);
            if(authentication){
                return this.RESPONSE(OK, authentication, OK_MESSAGE);
            }else{
                return this.RESPONSE(BADREQUEST, {}, BADREQUEST_MESSAGE);
            }
        } catch (error) {
            return this.RESPONSE(INTERNAL_SERVER_ERROR, error.message, INTERNAL_SERVER_ERROR_MESSAGE);
        }
    }
}

module.exports = new AuthService;