// Load environment variables from .env file
require('dotenv').config(); 

// Import necessary packages
const express = require('express');
const bcrypt = require('bcrypt'); // For password hashing
const { blogs, registers } = require('./model/index.js'); // Models
const { multer, storage } = require('./middleware/multerConfig.js'); // Multer for file uploads
const { where } = require('sequelize');
const upload = multer({ storage });

// Create an Express application instance
const app = express();

// Ensure the 'blogs' model is imported correctly
if (!blogs) {
    console.error("The 'blogs' model could not be imported. Please check your model definition.");
}

// Set up the view engine to use EJS for rendering templates
app.set('view engine', 'ejs');

// Middleware to serve static files (e.g., CSS, images)
app.use(express.static('public'));
app.use(express.static('public/css/'));
app.use(express.static('public/images'));

// Middleware to parse URL-encoded data from forms
app.use(express.urlencoded({ extended: true }));

// Routes

// Home page route - Render 'home.ejs' and pass blog data from the database
app.get('/', async (req, res) => {
    const datas = await blogs.findAll(); // Fetch all blogs
    res.render('home.ejs', { blogs: datas }); // Pass data to the template
    console.log(datas); // Logs data when page is refreshed
});

// Example route to render 'index.ejs' and pass sample data to it
app.get('/home', (req, res) => {
    const data = {
        name: 'Sudip Sharma',
        age: 20,
        city: 'Pokhara'
    };
    res.render('index.ejs', { obj1: data });
});

// Route to render 'about.ejs'
app.get('/about', (req, res) => {
    res.render('about.ejs');
});

// Route to render 'createBlog.ejs' for creating a new blog post
app.get('/create', (req, res) => {
    res.render('createBlog.ejs');
});

// Route to handle blog creation and file upload
app.post('/create', upload.single('image'), async (req, res) => {
    const { title, subtitle, description } = req.body;
    await blogs.create({
        title,
        subtitle,
        description,
        image: req.file.filename // Save the uploaded image filename
    });
    res.redirect('/'); // Redirect to the home page after successful creation
});

// Route to display a single blog post based on its ID
app.get('/blog/:id', async (req, res) => {
    const blogId = req.params.id; 
    const blog = await blogs.findByPk(blogId);
    res.render('singleBlog.ejs', { blog });
});

// Route to delete a blog post by ID
app.get('/delete/:id', async (req, res) => {
    const blogId = req.params.id;
    await blogs.destroy({ where: { id: blogId } });
    res.redirect('/');
});
//Render the editBlog Page
app.get('/edit/:id', async (req, res) => {
    const blogId = req.params.id;//extreacting the id from the url
    const blog = await blogs.findByPk(blogId)
    console.log(blog);
    res.render('editBlog.ejs', { blog });
});
app.post('/editBlog/:id', upload.single('image'), async (req, res) => {
    const { title, subtitle, description } = req.body;
    const blogId = req.params.id;

    // Update the data
    const updateData = {
        title,
        subtitle,
        description,
    };

    // Add the image field if a new file is uploaded
    if (req.file) {
        updateData.image = req.file.filename;
    }

    // Update the blog entry
    await blogs.update(updateData, {
        where: { id: blogId }
    });

    // Redirect to the home page after successful update
    res.redirect('/');
});




// Route to render user registration form
app.get('/register', (req, res) => {
    res.render('registerUser.ejs');
});

// Route to handle user registration
app.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
    await registers.create({
        username,
        email,
        password: bcrypt.hashSync(password, 10) // Hash the password
    });
    res.redirect('/login'); // Redirect to login page
});

// Route to render login form
app.get('/login', (req, res) => {
    res.render('loginUser.ejs');
});

// Route to handle user login
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await registers.findAll({ where: { username } });
    if (user.length === 0) {
        res.send("User not found");
    } else {
        const result = bcrypt.compareSync(password, user[0].password);
        result ? res.send("Login Successful") : res.send("Password not matched");
    }
});

// Start the server on port 3000
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
