/**
 * @module ServiceManager
 * @description The main encapsulating module which loads, initialises and manages all Skill Issues services.
 * This not only includes services but server infrastructure libraries too such as logging functionality,
 * resource managers and more
 * @author AzdenO
 */
///////////////////////////////////////////////////////////////////////////////////////

//service imports

//infrastructure imports

//global declarations
let Logger = null;
///////////////////////////////////////////////////////////////////////////////////////
/**
 * @function init
 * @description The first function to call on the module, loads, injects dependencies and initialises
 * all services and infrastructure modules
 * @param {(service: string, message: string, flag:string)=> void} logger A function that replaces standard
 * console.log calls for a more comprehensive logging infrastructure
 */
function init(logger){
    Logger = logger;
}
////////////////////////////////////////////////////////////////////////////////////////
export default{
    init
}