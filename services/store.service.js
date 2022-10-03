const Response = require('../utils/response.util');
const Store = require('../models/Store');

const {OK, NOTFOUND, BADREQUEST, CREATED, UPDATE, INTERNAL_SERVER_ERROR} = require('../utils/constants.util');
const {OK_MESSAGE, NOTFOUND_MESSAGE, BADREQUEST_MESSAGE, CREATED_MESSAGE, UPDATE_MESSAGE, INTERNAL_SERVER_ERROR_MESSAGE} = require('../utils/message.util');

class StoreService extends Response{
    async getAllStore(){
        try {
            const exist = await Store.findAll();
            if(exist){
                return this.RESPONSE(OK, exist, OK_MESSAGE);
            }else{
                return this.RESPONSE(NOTFOUND, [], NOTFOUND_MESSAGE);
            }
        } catch (error) {
            return this.RESPONSE(INTERNAL_SERVER_ERROR, {}, INTERNAL_SERVER_ERROR_MESSAGE);
        }
    }

    async getOneStore(requestObject){
        try {
            const find = await Store.findOne({ where:{ id: requestObject } });
            if(find){
                return this.RESPONSE(OK, find, OK_MESSAGE);
            }else{
                return this.RESPONSE(NOTFOUND, [], NOTFOUND_MESSAGE);
            }
        } catch (error) {
            return this.RESPONSE(INTERNAL_SERVER_ERROR, {}, INTERNAL_SERVER_ERROR_MESSAGE);
        }
    }

    async createStore(storeObject){
        try {

            const exist = await Store.findOne({ where: { name: storeObject.name } });

            if(!exist){
                const create = await Store.create(storeObject);
                if(create){
                    return this.RESPONSE(OK, create, "Successfully created!");
                }else{
                    return this.RESPONSE(BADREQUEST, [], "Cannot create record!");
                }
            }else{
                return this.RESPONSE(OK, exist.name, "Store already exist");
            }
            
        } catch (error) {
            return this.RESPONSE(INTERNAL_SERVER_ERROR, {}, INTERNAL_SERVER_ERROR_MESSAGE);
        }
    }

    async updateStore(requestObject){
        try {
            const update = await Store.update(requestObject, {where: {id: requestObject.id}} );
            if(update[0]){
                return this.RESPONSE(UPDATE, update, UPDATE_MESSAGE);
            }else{
                return this.RESPONSE(BADREQUEST, {}, BADREQUEST_MESSAGE);
            }
        } catch (error) {
            return this.RESPONSE(INTERNAL_SERVER_ERROR, {}, INTERNAL_SERVER_ERROR_MESSAGE);
        }
    }

    async deleteStore(requestObject){
        try {
            const deleteStore = await Store.destroy({where: {id: requestObject}});

            if(deleteStore){
                return this.RESPONSE(200, deleteStore, "Record Deleted!");
            }else{
                return this.RESPONSE(NOTFOUND, [], "Record not found");
            }

        } catch (error) {
            return this.RESPONSE(INTERNAL_SERVER_ERROR, {}, INTERNAL_SERVER_ERROR_MESSAGE);
        }
    }
}


module.exports = new StoreService;