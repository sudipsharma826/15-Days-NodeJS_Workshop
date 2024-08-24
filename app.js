require('dotenv').config();//this is the method to import the env file
const express= require('express');//requesting the express package
const app=express();
// in short ( of line 1 and 2) you can direclty write as : const app=require('express')();
// app.get('/',(req,res)=>{
//     res.send('Hello World');
// });
//to import the index js to run out then the app js is executed
require('./model/index.js');//to run the index.js file when the app.js run out
//improting the env file (for the security purpose)

//using the ejs
//install ejs by using the command npm install ejs
app.set('view engine','ejs');//setting the veiw engine to the ejs
//when the user get into the site the default page is the index.ejs and 
//here we seen how can we pass any data to the file in the ejs
app.get('/',(req,res)=>{
    const data={
        name:'Sudip Sharma',
        age:20,
        city:'Pokhara'
    };
    res.render('index.ejs', {
         obj1: data
        });
});
// app.get('/about',(req,res)=>{
//     res.send('This is the about page');
// });
//simply setting the location where to go and what to show when the user get ...../about page
app.get('/about',(req,res)=>{//localhost:3000/about
    res.render('about.ejs');//to send the file we use the render method
});
//in node js for the security purpose ,the internal file also cannot connect with each other 
//we need to manually connect it
//To give the acess to the css file in the index.ejs file
//app.use(express.static('public'));//this make the all the file in the public folder to be accessed in the index.ejs file
app.use(express.static('public/css'));//this make only the file in the public -> css acesable.
app.listen(3001,()=>{
    //here the 3000 port number is your url of the project: localhost::3000;
    //donnot be confused with the port number:
    //1.3306 is deafult for the database
    //2.3000 is the port number for the server (its your choice)
    console.log('Server is running on port 3000');
});