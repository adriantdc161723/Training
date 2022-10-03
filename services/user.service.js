const dotenv = require('dotenv').config();
const bcrypt = require('bcrypt');
const Response = require('../utils/response.util');
const {OK, NOTFOUND, BADREQUEST, CREATED, UPDATE, INTERNAL_SERVER_ERROR} = require('../utils/constants.util');
const {OK_MESSAGE, NOTFOUND_MESSAGE, BADREQUEST_MESSAGE, CREATED_MESSAGE, UPDATE_MESSAGE, INTERNAL_SERVER_ERROR_MESSAGE} = require('../utils/message.util');
const User = require('../models/User');
const AuthService = require('../services/auth.service');

class UserService extends Response{
    
    //Login
    async login(requestObject){
        try {
            const exist = await User.findOne({where: {username: requestObject.username}});
            if(exist){
                const matchedPassword = await bcrypt.compare(requestObject.password, exist["dataValues"].password);

                if(matchedPassword){
                    const token = await AuthService.auth(exist["dataValues"]);
                    return this.RESPONSE(OK, token.response, OK_MESSAGE);
                }else{
                    return  this.RESPONSE(BADREQUEST, {}, BADREQUEST_MESSAGE);
                }

            }else{
                return  this.RESPONSE(BADREQUEST, {}, BADREQUEST_MESSAGE);
            }
        } catch (error) {
            return this.RESPONSE(INTERNAL_SERVER_ERROR, error.message, INTERNAL_SERVER_ERROR_MESSAGE);
        }
    }


    //Sign-up
    async signup(requestObject){
        try {

            if(requestObject){
                
                const hashedPassword = await bcrypt.hash(requestObject.password, 10);
                const exist = await User.findOne({where: {username: requestObject.username}});
                
                if(requestObject.password === requestObject.confirmPassword){

                    if(!exist){

                        const create = await User.create({username: requestObject.username, password: hashedPassword, is_active: true});
                        return create ? this.RESPONSE(CREATED, create, CREATED_MESSAGE) :  this.RESPONSE(BADREQUEST, {}, BADREQUEST_MESSAGE);
                        
                    }else{
                        return this.RESPONSE(OK, {}, "User already exist");
                    }

                }else{
                    return  this.RESPONSE(BADREQUEST, {}, "Password not match!");
                }

            }else{
                return  this.RESPONSE(BADREQUEST, {}, BADREQUEST_MESSAGE);
            }

            
        } catch (error) {
            return this.RESPONSE(INTERNAL_SERVER_ERROR, error.message, INTERNAL_SERVER_ERROR_MESSAGE);
        }
    }
}


module.exports = new UserService();