/**
 * @module MiddleWareRegister
 * @description a collection of functions to be used as API middleware when receiving requests.
 * This module exports an object with a collection of middleware functions as "Main" as well as a seperate
 * export named "Init" which wraps around the init() function. init() should be called before using
 * any functions found in "Main"
 * @author AzdenO
 */

//define global references
let LoggingMachine = null;
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Initialisation of module, where it receives the service manager which might be required in some middlewares,
 * such as API-Key verification, token verification, etc.
 * @param {ServiceManager} ServiceManager The Servers singleton Service Manager
 */
function init(ServiceManager){

}
////////////////////////////////////////////////////////////////////////////////////////////////////////////
function Logger(req,res,next){

}
////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Collection of all functions that are to be used as API middleware. The order the functions appear in this
 * object is the order the Express API will move through them with each request
 */
export const Main = {
    Logger
}

/**
 * Exported init function, seperate to main export where all server middleware function references are
 * @param {ServiceManager} ServiceManager The APIs service manager
 */
export const Init = (ServiceManager) =>{
    init(ServiceManager);
}
