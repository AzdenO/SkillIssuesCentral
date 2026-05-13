/**
 * Start the server by executing this file
 * @author AzdenO
 */


/**
 *
 */
import Resources from "./server/infrastructure/resources/Resources.js";//resource manager
import Logger from "./server/infrastructure/logger/Logger.js";//logging machine
import ServerBus from "./server/infrastructure/serverbus/ServerEmitter.js";//server bus singleton
import ServerMain from "./server/Server.mjs"//the actual server

//the order this initialisation occurs is obvious and should not be changed unless dependencies change
const ResourceManager = new Resources()
Logger.init(ServerBus,ResourceManager);
ResourceManager.assignLogger(Logger.log);

/////////////////////////////////////////////Start Server//////////////////////////////////////////////////
await ServerMain.init(Logger.log, ResourceManager,ServerBus);

ServerMain.startServer();