# it-crowd-ecommerce


This is an application in order to complete a challenge for a Fullstack Junior position at it-crowd.

It consists of what could later grow into a complete e commerce app

The structure of the app consists of an API and a CLIENT.

The stack of technologies for the app are the following:

API: javascript, nodejs, express, postgreSQL, validations through JasonWebToken for an admin user and bcrypt for hashing passwords.

CLIENT: typescript, React, Redux, Bootstrap, Styled Components for styling.

DEPLOY:


The app counts with a deploy at https://itcrowd-ecommerce.vercel.app

if you want to locally run this app, follow this instructions:

First, clone the rep into your PC

then, navigate to API and procced to 

npm i         // to install necessary dependencies

create a .env file with the following keys:

PORT=    // a port for the api
DB_USER=  // your postgre server user name
DB_NAME=  // you need to create a database called itcrowd and set it as an env value here
DB_PASSWORD=  // your db password
DB_HOST= // your db host, on posgre most of the time is 5432 
SECRET_KEY=  // provide a secret word
NODE_ENV= // if production, a specific congif will be run. Leave blank for local running

then, navigate to CLIENT directory

npm i   // to install dependencies

npm start to run the project's frontend



DESCPRIPTION:

API:

a REST api that allows us to, create, update, erase, read PRODUCTS, add and read BRANDS, also add CATEGORIES and SUBCATEGORIES


you can also SIGN UP, by default, users are provided a role of admin in order to test the app features.

The following enpoints are aviable. No auth is required on GET methods, but PUT, POST and DELETE methods will require an authentication which will be provided
by an auth-token header.

/api get endpoints:

/products   : retrieves a list of aviable products
/products/:id : retrieves a single product detail by its id
/brands     : retrieves a list of aviable brands
/categories     : retrieves a list of aviable categories
/subcategories     : retrieves a list of aviable subcategories
 
 
 note: all post, put and delete methods require authentication.

/api post endpoints: 


/brands    : create a brand 



/signup   : create a user account
/signin   : log into the app


/api/admin post endpoints: they require an auth method to be used


/products  : add a product
/categories : create a category
/subcategories : create a subcategory


/api/admin  put endpoints

/products/inactive/:id   set a product as inactive
/products/:id   update a product


/api/admin delete endpoints


/products/del/:id  delete a product
/subcategories/:id delete a subcategory
/category/:id delete a category
/brands/:id delete a brand


the database consists of a postgre SQL enviroment.


CLIENT:

Technologies: React, Redux, Typescript, React router, Bootstrap on styles and styled components.  

A simple interface where the user can view a series of products cards, it allows the user to search for a product, view products filtering by category or brand
Do orderings by price from higher to lower, lower to higher, A-Z, Z-A, create an account, select products and add them into a cart.
Admins can publish products, set them as inactive, delete them, create categories, subcategories and brands, update products, delete products, categories, subcategories, brands

It's meant to be scalable as a project.







































