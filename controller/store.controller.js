const StoreService = require('../services/store.service');



class StoreController{
    async getAllStore(){
        const response = await StoreService.getAllStore();
        return response;
    }
    async getOneStore(requestObject){
        const response = await StoreService.getOneStore(requestObject);
        return response;
    }

    async createStore(storeObject){
        const response = await StoreService.createStore(storeObject);
        return response;
    }

    async updateStore(requestObject){
        const response = await StoreService.updateStore(requestObject);
        return response;
    }

    async deleteStore(requestObject){
        const response = await StoreService.deleteStore(requestObject);
        return response;
    }
}

module.exports = new StoreController();