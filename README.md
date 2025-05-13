**This is the GitHub for 9.1P**
First, I created an account on MongoDB, then get the password with the account URL to connect to MongoDB. The URL will be something like this (it will also act as a password for later):
mongodb+srv://<username>:<password>@<cluster-name>.xxxxx.mongodb.net/
In the terminal, install dotenv package:
npm install dotenv
Then, create a .env file inside the project will the URL to connect to MongoDB
 
The file should include these 2 lines 
Next, install the MongoDB extension on VS Code, after logging into your account, you can connect to MongoDB from the extension
 
In the project folder, I added 4 files: mongo-deployment.yaml, mongo-pv-pvc.yaml, mongo-secret.yaml and mongo-service.yaml 
 
**Server.js**
The last step is to modify server.js
 
First, install mongoose using npm install mongoose then add it to the project 
Then I connect to MongoDB using the URL we added into the environment earlier:
 
Next, I create a Model for how the data should be saved as in the database
 
Then, to make it easier when saving the data, I use a function to handle the operations
 
When the GET is called, the data will be transferred to the handle operation and saved into the database 
 
I also add a new endpoint /history to fetch the data from the database back.

**Result:**
The data is saved to the database and can be fetch using GET (/history).
