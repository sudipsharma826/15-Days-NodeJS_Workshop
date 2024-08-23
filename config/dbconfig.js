//this stores all the configuration of the database ,server and many more
//1.We use it be export the dabase configuration to the index.js file
//IMP
// to export ,we use the module.exports={};
//here module is the object and the exports is the method and the db is the object that stores all the configuration
module.exports={
    // HOST : "localhost",
    // USER : "root",
    // PASSWORD : "",
    // DB: "sudip",//DB stands for the database name
    // dialect: "mysql",
    // PORT: 3306,
    // pool:
    // {
    //     max:5,
    //     min:0,
    //     acquire:30000,
    //     idle:10000
    // }

    //For the security purpose we use the env file
    HOST: process.env.HOST,
    USER: process.env.USERNAME2,
    PASSWORD: process.env.PASSWORD,
    DB: process.env.NAME,
    dialect: "mysql",
    PORT: 3306,
    pool:
    {
        max:5,
        min:0,
        acquire:30000,
        idle:10000
    }
};