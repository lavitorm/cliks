![CLIKS](/screenshots/cliks.png)
##
### CLIKS is a fullstack match making application using the Express package for Node.js and MySQL. It takes in parameters from users and gives back data.

## Overview
CLIKS is an environment for people to exchange knowledge and valuable experiences. Through networking that is genuinely diverse, people-oriented and purpose-driven, people united by common interests and goals share resources and information with the purpose of improving personal and collective results. 

CLIKS unites people only by interests in a purposeful context of engagement, encouragement, development and growth in their priorities. It is a take and give environment where people find their path to move forward by supporting each other.

This app uses Express to serve static HTML files and API routes to get and post data.

Note that for this version, data is not persistent, but rather stored in an object in `user.js` for your current session.

## Key app features
1. User registration and login
2. Match making script (js) and queries (sql) to genereate a network that `unites users by similarities, interests and goals` 
3. Client-server model
4. Request-response pattern
5. Chat

# Instructions
After cloning down the repo to your laptop, run `npm install` to download the Node dependencies.
* Express
* MySql
* Method-override
Then, be sure to serve the app in `localhost:3000` in your browser.

# Screenshots/flow of navigation

### Login with your personal info to access the "user_setup" page
![Home Page](/screenshots/index.png)

### Add your name, email and a link to a picture of yourself + answer a few questions to register
![User setup Page](/screenshots/user_setup.png)

### Click the submit button to register and access your "my_network" page (all the users you can match)
![Submit Button](/screenshots/submit_button.png)

### On submission, a modal with your user match will appear upon submission/access to "my_network" page
![Resultsl](/screenshots/my_network.png)

### The “my_network” page shows a full “navbar” with a menu to facilitate user navigation
![Resultsl](/screenshots/navbar.png)

### The “my_network” page also gives the user access to chat with his/her network
![Resultsl](/screenshots/chat.png)

Check out the deployed app on Heroku [here](https://clicks-express-sql.herokuapp.com/)!
