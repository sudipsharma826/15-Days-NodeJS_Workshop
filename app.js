require('dotenv').config(); // This imports the .env file to access environment variables.
const express = require('express'); // Importing the Express package.
const app = express(); // Creating an Express application instance.
const bcrypt = require('bcrypt');//importing the bcrypt package to encrypt the password
 const { blogs, registers } = require('./model/index.js'); // Importing the 'blogs' model from the index.js file in the model folder.

 // Check if the 'blogs' variable is imported correctly
 if (!blogs) {
   console.error("The 'blogs' model could not be imported. Please check your model definition.");
}

// Alternatively, you could write:
// const app = require('express')(); // Directly create an Express app instance while requiring Express.

// This block is a sample route that sends "Hello World" when accessing the root URL.
// app.get('/', (req, res) => {
//     res.send('Hello World');
// });

// Importing the index.js file to ensure the models are loaded when app.js is executed.
require('./model/index.js');

//Importing the multer and the storage from the multerConfig.js file.
const { multer, storage } = require('./middleware/multerConfig.js');
const upload = multer({ storage });
//it means when upload is used it call multer and then only multer call the storage
////now ,uplaod is used to handle or accept the file from the user

// Setting up EJS as the view engine for rendering templates.
app.set('view engine', 'ejs');

// Route to render the 'index.ejs' template as the home page.
app.get('/', async(req, res) => {
    //to get the data from the datbase
   const datas=await blogs.findAll();//in raw this is SELECT * FROM blogs;
    res.render('home.ejs',{blogs:datas});//this passing the data form the database to the home.ejs
    console.log(datas);//data will only console if you referesh the page e.g localhost:3000
});

//Example route to render 'index.ejs' and pass data to it.
app.get('/home', (req, res) => {
    const data = {
        name: 'Sudip Sharma',
        age: 20,
        city: 'Pokhara'
    };
    res.render('index.ejs', { obj1: data });
});

//Example route to render 'about.ejs' when accessing /about.
app.get('/about', (req, res) => {
    res.render('about.ejs');
});

// Serving static files (e.g., CSS, images) from the 'public' directory.
app.use(express.static('public/css/'));
//To public the image
app.use(express.static('public/images'));

// //To make all public files available
 app.use(express.static('public'));

// Middleware to parse URL-encoded data from forms.
// This allows Node.js to understand form data.
app.use(express.urlencoded({ extended: true }));

// Route to render the 'createBlog.ejs' template for creating a new blog post.
app.get('/create', (req, res) => {
    res.render('createBlog.ejs');
});



// Route to handle form submissions for creating a new blog post.
app.post('/create', upload.single('image'), async (req, res) => {
    // Destructure the form data from the request body.
    const { title, subtitle, description } = req.body;
    // Check if the file is received correctly.
    //console.log(req.file);
    

    // Attempt to create a new blog entry in the database.
        await blogs.create({
            title,
            subtitle,
            description,
            image : req.file.filename
           // image: req.file.path
        });
        res.redirect('/'); //refirect to home page after the sucess
       
});

// To show the single page blog
app.get('/blog/:id', async(req, res) => {
    const blogId = req.params.id;  // Get the blog ID from the URL.
    const blog = await blogs.findByPk(blogId);
    res.render('singleBlog.ejs', { blog : blog });
});


//To delete the blog
app.get('/delete/:id', async(req, res) => {
    const blogId = req.params.id;//To get the id of the blog
    await blogs.destroy({
        where: {
            id: blogId
        }
    });
    res.redirect('/');
});

//Register Form Rendering
app.get("/register",(req,res)=>{
    res.render("registerUser.ejs");
})

//Route to handle the user login data
app.post("/register",async(req,res)=>{
    const{username,email,password}= req.body;
    await registers.create({
        username,
        email,
        password : bcrypt.hashSync(password, 10)//value between 8-12
 })
 res.redirect('/login');   


})
app.get("/login",(req,res)=>{
    res.render("loginUser.ejs");
})
//Route to handle the login data
app.post("/login",async(req,res)=>{
    const{username,password}= req.body;
    console.log(req.body);
    const user=await registers.findAll({
        where:{
            username:username
        }
    });
    if(user.length==0){
        res.send("User not found");
    }else{
        const result=bcrypt.compareSync(password,user[0].password);
        if(result){
            res.send("Login Sucessfull");
        }else{
            res.send("Password not matched");
        }
    }
})

// Start the server on port 3000.
app.listen(3000, () => {
    console.log('Server is running on port 3000');
    // Port 3000 is used for the server, while 3306 is the default for the database.
});
