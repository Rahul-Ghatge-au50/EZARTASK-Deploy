# EAZR-TASK

Deployment Link - https://ezartask.vercel.app/register

Clone the Repository
git clone https://github.com/Rahul-Ghatge-au50/EAZR-TASK.git
cd your-repo-name

//SET UP FOR BACKEND
cd server
npm install

ENVIRONMNET VARIABLE
PORT  = 8000;
MONGO_URI = 'mongodb://localhost:27017/'
JWT_SECRET = 'RAZETASK';

run command npm start


//SET UP FOR FRONTEND
cd ../client
npm install

run command npm start

TECH STACK OVERVIEW
FROTNEND 
React.js - for building the user Interface
Bootstrap - for making UI responsive and attractive
React-Router - for navigation and routing 
Axios - for making hhtp request

BACKEND
Node. and Expess.js - for building the RESTful Api
Mongoose - for mongodb object modeling
JWT - for authentication and authorization
dotenv - for managing environment variables

TOOLS
Visual Code - Code editor
Postman - API Testing
Git and GitHub - for deploying code


The Goal was to build a simple Task Management Web Application using the Mern Stack 
I keept the Frontend and Backend in the different folder ,used JWT authentication for user speific task operation
Created API for creating ,editing ,liting and deleting Tasks and added filter by Status and task title

Key Features
User Authentication with JWT
Protected Routes
CRUD Operations
Responsive UI using Bootstrap
Search and Filter task by Status and Title

Challenges Faced
Handling JWT Authentication and authorization and While Filtering Task
Formating Date format between Mongodb and frontend
Git related Issues when trying to add the folder to git.


