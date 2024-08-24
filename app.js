require('dotenv').config(); // This imports the .env file to access environment variables.
const express = require('express'); // Importing the Express package.
const app = express(); // Creating an Express application instance.

 const { blogs } = require('./model/index.js'); // Importing the 'blogs' model from the index.js file in the model folder.

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

// Setting up EJS as the view engine for rendering templates.
app.set('view engine', 'ejs');

// Example route to render 'index.ejs' and pass data to it.
// app.get('/', (req, res) => {
//     const data = {
//         name: 'Sudip Sharma',
//         age: 20,
//         city: 'Pokhara'
//     };
//     res.render('index.ejs', { obj1: data });
// });

// Example route to render 'about.ejs' when accessing /about.
// app.get('/about', (req, res) => {
//     res.render('about.ejs');
// });

// Serving static files (e.g., CSS, images) from the 'public' directory.
app.use(express.static('public'));

// Middleware to parse URL-encoded data from forms.
// This allows Node.js to understand form data.
app.use(express.urlencoded({ extended: true }));

// Route to render the 'createBlog.ejs' template for creating a new blog post.
app.get('/create', (req, res) => {
    res.render('createBlog.ejs');
});

// Route to render the 'index.ejs' template as the home page.
app.get('/', (req, res) => {
    res.render('index.ejs');
});

// Route to handle form submissions for creating a new blog post.
app.post('/create', async (req, res) => {
    // Destructure the form data from the request body.
    const { title, subtitle, description, image } = req.body;

    // Attempt to create a new blog entry in the database.
        await blogs.create({
            title,
            subtitle,
            description,
            image
        });
        res.send('Data Added In Database');
});

// Serve only CSS files from the 'public/css' directory.
app.use(express.static('public/css'));

// Start the server on port 3000.
app.listen(3000, () => {
    console.log('Server is running on port 3000');
    // Port 3000 is used for the server, while 3306 is the default for the database.
});
