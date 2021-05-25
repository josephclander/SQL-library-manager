# SQL Library Manager - Team Treehouse Project

In this assignment from TeamTreehouse, you have been tasked with creating an application for your local library to help them manage their collection of books. The librarian has been using a simple SQLite database and has been entering data manually. The application you create should provide a more intuitive way to manage the library's collection of books.

In this project, you will build a web application that will include pages to list, add, update, and delete books. You'll be given HTML designs and an existing SQLite database. You'll be required to implement a dynamic website using JavaScript, Node.js, Express, Pug, SQLite and the SQL ORM Sequelize.

## Table of Contents

[Running the App](#running-the-app)

[Instructions](#instructions)

[Extra Credit Instructions](#extra-credit-instructions)

## Running the App

[tbc]

## Instructions

1.  Initialize project
    With your project files open in your editor and the terminal open and pointed at the root of your project, use the [Express application generator](https://expressjs.com/en/starter/generator.html) to initialize your application.

2.  Install additional dependencies
    At a minimum, your project will need:

    - `sequelize`
    - `sqlite3`
    - `pug`

3.  Initialize the Sequelize ORM
    Use the latest version of the Sequelize CLI to initialize Sequelize

    - In the terminal, run:

      - npm install sequelize-cli
      - npx sequelize init
      - Open the config/config.js file and replace its contents with the following JSON:

        ```
        {
            "development": {
                "dialect": "sqlite",
                "storage": "library.db"
            },
            "test": {
                "dialect": "sqlite",
                "storage": "library.db"
            },
            "production": {
                "dialect": "sqlite",
                "storage": "library.db"
            }
        }
        ```

4.  Create the `Book` model
    Use the Sequelize CLI to generate your Book model to facilitate interacting with the database.

    - In the terminal, run:
      - `npx sequelize model:create --name Book --attributes title:string,author:string,genre:string,year:integer`
    - Inspect the new `Book` model in the `models/book.js` file to ensure it has the following properties set to the correct data types:
      - `title` - string
      - `author` - string
      - `genre` - string
      - `year` - integer
    - In the `Book` Model, for the `title` and `author` properties:
      - Set the `allowNull` property to false
      - Add Sequelize ORM validation and appropriate error messages to ensure the `title` and `author` values cannot be empty when creating a new book, or updating an existing one

5.  Test connection to the database and sync the model

    - In `app.js`:
      - Use the `require` method to import the instance of `sequelize` that was instantiated for you in the `models/index.js` file when you used the sequelize CLI
      - Use the `sequelize.authenticate()` method to asynchronously connect to the database and log out a message indicating that a connection has/hasn’t been established
      - Use the `sequelize.sync()` method to sync the model with the database
    - Restart the app and confirm that the connection message is printing to the terminal

6.  Test the Book model and communication with the database
    In the `routes/index.js` file that was created for you:

    - Import the `Book` model from the `../models` folder
    - In the body of the `GET ‘/’` route handler provided for you:
      - Delete or comment out the `res.render` method
      - Asynchronously use the `findAll()` method on the Book model to get all the books, and store them in a variable
      - Log out the books variable and use the `res.json()` method display the books on a webpage
      - Restart the app and point Chrome at `http://localhost:3000/`

7.  Set up middleware

    - Set up your static middleware for serving static files
    - Set up your 404 handler to:
      - Create a new `Error()`
      - Set its `status` property to `404`
      - Set its `message` property to a user friendly message
      - Render the `page-not-found` template. Be sure that you're passing the `{error}` you're creating as the second parameter in the render method. See the `page_not_found.html` file in the `example-markup` folder for an example of what this page should look like.
    - Set up the global error handler to:
      - Set the `err.status` property to `500` if `status` isn't already defined
        - Set the `err.message` property to a user friendly message if `message` isn't already defined
        - Log the err object's `status` and `message` properties to the console
        - Render the `error` template. Be sure that you're passing the `{err}` that you're updating as the second parameter in the render method. See the `error.html` file in the `example-markup` folder for an example of what this page should look like.
    - Test your error handling by pointing the browser at a few undefined routes, like `/noroute` and `/books/noroute`, as well as temporarily throwing an intentional 500 error in one of your routes.
      > **Note:** The job of handling server errors and bad requests in Express is more at home in the error handling middleware you set up, and less at home in each individual route handler. The route handlers try to fulfill requests and catch errors if they occur. Then they pass those errors off to the error handlers, who decide what to do with those errors once caught. See the [Practice Error Handling in Express Workshop](https://teamtreehouse.com/library/practice-error-handling-in-express) to learn more about this type of error handling.

8.  Set up routes

    - At the very least, you will need the following routes:
      - get `/` - Home route should redirect to the `/books` route
      - get `/books` - Shows the full list of books
      - get `/books/new` - Shows the create new book form
      - post `/books/new` - Posts a new book to the database
      - get `/books/:id` - Shows book detail form
      - post `/books/:id` - Updates book info in the database
      - post `/books/:id/delete` - Deletes a book. Careful, this can’t be undone. It can be helpful to create a new “test” book to test deleting

9.  Build your views

    - Use the examples in the `example-markup` folder to see what your views should look like and what elements they should have. At the very least, you will need the following views: - `layout.pug` - for the boilerplate markup that should be on every page - `index.pug` - for the main book listing page - `new-book.pug` - for the new book form - `update-book.pug` - for the update book form - `error.pug` - for displaying user friendly error message - `page-not-found.pug` - for displaying user friendly “Page Not Found” message
      **NOTE:** You should use Pug to render your views for this project. Avoid using a front end library or framework such as React, Angular, or Vue.

10. Required fields and forms

    - If the required `title` and `author` fields are empty upon form submission, the user should be notified accordingly with a friendly error message on the page. See the `form-error.html` file for an example of what this will look like.
    - Use Sequelize model validation for validating your form fields. Don't rely simply on HTML5 built in validation
    - When form labels are clicked, the corresponding input should be placed in the focus state. This is accomplished by matching the input’s id attribute to its label’s `for` attribute
      **NOTE:** When new book or book detail form is submitted, your app should redirect to the books listing page

11. Styles and Layout
    - You are provided with all the styles you will need for this project, in the `public/stylesheets/styles`.css file. This is the CSS file that you will need to link to your Pug templates
    - Feel encouraged to customize things like color, background color, fonts, borders, and shadows. But the layout and positioning of elements should generally match the example `HTML` files in the `example-markup` folder
      **NOTE:** The `href` value that you use in your `layout.pug` file to add the styles will not exactly match the ones in the example `HTML` files in the `example-markup` folder

## Extra Credit Instructions

1. Search

   - Include a search field for the books listing page. Search should work for all of the following fields:
     - Title
     - Author
     - Genre
     - Year
       **Note:** Searching should be case insensitive and be good for partial matches for strings.

2. Pagination
   - Include pagination for the books listing page.
