const makeRegisterTable=(sequelize,DataTypes)=>{
    
        const register=sequelize.define("register",{//acutally table name is tables
            username:{
                type:DataTypes.STRING,
                allowNull:false,
            },
            email:{
                type:DataTypes.STRING,
                allowNull:false,
            },
            password:{
                type:DataTypes.STRING,
                allowNull:false,
            }
        });
        return register;
    };
module.exports=makeRegisterTable;