import fs from "node:fs"
/**
 * @class Resources
 * @description Singleton object passed to necessary components that on instantiation, loads all necessary resources
 * and provides them where necessary
 * @author AzdenO
 * @version 0.1
 */
/////////////////////////////////////////////////////////////////////////////////////////

export default class Resources {

    /////////////////////////////////////////////////////////////////////////////////////
    /**
     * @constructor
     * @description Loads all resources and stores them as object attributes
     */
    constructor(){
        this.config = this.loadResourceConfig();
        for(let resource of this.config.resources){
            this[(resource.split(".")[0])] = this.loadResources(resource);
        }
        for(let config of this.config.configs){
            this[(config.split(".")[0])] = this.loadConfigs(config);
        }
    }
    /////////////////////////////////////////////////////////////////////////////////////
    /**
     * @function assignLogger
     * @description Function to pass in to this class the custom logging function utilised throughout the
     * server. Due to initialisation factors, a singleton of this class must be instantiated before the logger
     * can be, therefore once the logger is initialised, we can then pass a reference to it in here and assign
     * it as a property
     */
    assignLogger(logger){
        this.log = logger;
    }
    /////////////////////////////////////////////////////////////////////////////////////
    loadResourceConfig(){
        return JSON.parse(fs.readFileSync("./config/resourceConfig.json","utf-8"));
    }
    ////////////////////////////////////////////////////////////////////////////////////
    loadResources(filename){
        return JSON.parse(fs.readFileSync(this.config.resourceDir+filename,"utf-8"))
    }
    ////////////////////////////////////////////////////////////////////////////////////
    loadConfigs(filename){
        return JSON.parse(fs.readFileSync(this.config.configDir+filename,"utf-8"))
    }
    ///////////////////////////////////////////////////////////////////////////////////
    getLoggerConfig(){
        return this.loggerConfig;
    }
    ///////////////////////////////////////////////////////////////////////////////////
    createFile(filename,dirpath){
        fs.writeFileSync(dirpath+"\\"+filename+".txt","",(err)=>{

        });
    }
    ///////////////////////////////////////////////////////////////////////////////////
    appendToFile(path,line){
        fs.appendFileSync(path,line,(err)=>{

        });
    }
    ///////////////////////////////////////////////////////////////////////////////////


}