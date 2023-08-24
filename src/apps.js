const {logger} = require ("./config/logger")
const {httpServer} = require("./server")
const cluster = require('node:cluster')
const {cpus} = require('node:os')



const numeroProcesadores = cpus().lenght
// console.log(cluster.isPrimary)
// //console.log('pid:', process.pid);

// if(cluster.isPrimary){
//     logger.info('procesos primario, generando un worker')
//     cluster.fork()
// }else{
//     console.log('al ser un proceso forkeado, no cuento como primario, por lo tanto primary es false, entonces soy un worker');

// }




// httpServer()