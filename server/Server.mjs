/**
 * @module Server
 * @description Main wrapping/abstraction module to handle express logic, initialisation, setup and more
 * @author AzdenO
 */

//API and Server imports
import express from "express";
import https from "https";
import CORS from "cors";

//Service imports
import {Init as MiddlewareInit, Main as MiddlewareMain} from "./middleware/MiddlewareRegister.js"
import ServiceManager from "./services/ServiceManager.js"

//define global resources
let Logger = null;//custom logging function passed as a dependency through initialisation
let ResourceManager = null;//resource manager to access everything from configs to assets
let ServerBus = null;//singleton instance of an event emitter
const SERVICE_NAME = "Server";//easy global def for passing into the logger

//////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * @function init
 * @param {(string: service, string: message, string: flag)=> void} logger A function that replaces standard
 * console.log calls for a more comprehensive logging infrastructure
 * @param {Resources} resources Singleton instance of the Resources class, used to access everything from
 * configs to assets
 * @param {ServerBus} bus A singleton instance of a node event emitter, used server wide
 * @description Main function to initialise the api, including configuring middleware, connecting routes and
 * other necessary logic
 */
async function init(logger,resources,bus){
    Logger = logger;
    ResourceManager = resources;
    ServerBus = bus

    try{
        //Initialising Service Manager
        Logger(SERVICE_NAME,"Initialising Service Manager","INFO");
        ServiceManager.init(Logger)

        //define express server and https server
        Logger(SERVICE_NAME,"Instantiating express server object","INFO");
        const api = express();
        Logger(SERVICE_NAME,"Instantiating https server object","INFO");

        //Initialise middleware register and attach middleware to API
        Logger(SERVICE_NAME,"Initialising Middleware Register","INFO");
        //MiddlewareInit()
        attachMiddleware(api);

        //Initialise Routes Compiler and attach routes to API
        Logger(SERVICE_NAME,"Initialising Routes Compiler","INFO");


        //configure CORS policy
        Logger(SERVICE_NAME,"Configuring APIs CORS policy","INFO");
        configureCors(api);

        //configure https and start server
        Logger(SERVICE_NAME,"Configuring https options and booting server","INFO");

    }catch(e){
        Logger(SERVICE_NAME,"Unable to initialize server: "+e.stack,"INFO");
        process.exit(-1)
    }


}
//////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * @function attachMiddleware
 * @description, attach all necessary middleware and configure them to the api instance
 * @param api {Express} An express app instance
 */
function attachMiddleware(api){

    api.use(express.json())//parse incoming request bodies as json, if request body is of type json

    Object.values(MiddlewareMain).forEach(job =>{
        api.use(job)
    })


}
//////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * @function configureCors
 * @description Configure Cross-Origin Resource Sharing policy for API instance
 * @param api {Express} Express API instance
 */
function configureCors(api){

    api.use(CORS({
        origin: ["https://localhost:25876"],
        methods: ["GET", "POST", "PUT", "DELETE","OPTIONS","UPDATE"],
    }));
}
///////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * @function startServer
 * @description Start the server, including providing https options
 */
async function startServer(){

}
///////////////////////////////////////////////////////////////////////////////////////////////////////
export default{
    init,
    startServer
}