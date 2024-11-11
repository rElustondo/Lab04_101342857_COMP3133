# 👤 User Management API

This project is a **Node.js REST API** that uses **Express** and **MongoDB** (via Mongoose) to manage user data. The API supports creating user records with detailed validations.

## 📂 Project Structure

```plaintext
├── models
│   └── Users.js
├── routes
│   └── UserRoutes.js
├── app.js
├── package.json
└── README.md
🛠️ Technologies Used
Node.js for server-side scripting.
Express for building the RESTful API.
MongoDB as the NoSQL database.
Mongoose for object data modeling (ODM).
dotenv for managing environment variables (if applicable).
📦 Installation
Clone the Repository:

bash
Copy code
git clone https://github.com/yourusername/user-management-api.git
cd user-management-api
Install Dependencies:

bash
Copy code
npm install
Set Up MongoDB Connection:

Update the MongoDB connection string in app.js with your own MongoDB URI.
Run the Server:

bash
Copy code
node app.js
Environment Variables:

If using a .env file, ensure it has the following structure:
makefile
Copy code
PORT=3000
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/comp3133_lab04
🚀 API Endpoints
1. Create a New User
URL: /users
Method: POST
Request Body (JSON):
json
Copy code
{
  "name": "John Doe",
  "username": "johnd",
  "email": "john.doe@example.com",
  "address": {
    "street": "Main St",
    "suite": "Apt 101",
    "city": "New York",
    "zipcode": "12345-6789",
    "geo": {
      "lat": "40.7128",
      "lng": "-74.0060"
    }
  },
  "phone": "1-800-555-1234",
  "website": "http://johndoe.com",
  "company": {
    "name": "Doe Enterprises",
    "catchPhrase": "Innovate and Lead",
    "bs": "enterprise solutions"
  }
}
Response:
201 Created: Returns the created user object.
400 Bad Request: Returns validation errors.
Example cURL Request:
bash
Copy code
curl -X POST http://localhost:3000/users \
-H "Content-Type: application/json" \
-d '{
  "name": "Jane Smith",
  "username": "janesmith",
  "email": "jane.smith@example.com",
  "address": {
    "street": "Ocean Ave",
    "suite": "Suite 5B",
    "city": "San Francisco",
    "zipcode": "98765-4321",
    "geo": {
      "lat": "37.7749",
      "lng": "-122.4194"
    }
  },
  "phone": "1-415-555-5678",
  "website": "http://janesmith.com",
  "company": {
    "name": "Smith & Co",
    "catchPhrase": "Empowering the Future",
    "bs": "technology innovations"
  }
}'
📄 Schema Validation
models/Users.js
This file defines the schema for the User collection in MongoDB.

javascript
Copy code
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true,
    minlength: 4
  },
  email: {
    type: String,
    required: true,
    validate: {
      validator: (value) => {
        return /\S+@\S+\.\S+/.test(value);
      },
      message: 'Invalid email address'
    }
  },
  address: {
    street: { type: String, required: true },
    suite: { type: String, required: true },
    city: {
      type: String,
      required: true,
      validate: {
        validator: (value) => /^[a-zA-Z ]+$/.test(value),
        message: 'Invalid city name'
      }
    },
    zipcode: {
      type: String,
      required: true,
      validate: {
        validator: (value) => /^\d{5}-\d{4}$/.test(value),
        message: 'Invalid zip code format. Use DDDDD-DDDD format'
      }
    },
    geo: {
      lat: { type: String, required: true },
      lng: { type: String, required: true }
    }
  },
  phone: {
    type: String,
    required: true,
    validate: {
      validator: (value) => /^\d-\d{3}-\d{3}-\d{4}$/.test(value),
      message: 'Invalid phone number format. Use D-DDD-DDD-DDDD format'
    }
  },
  website: {
    type: String,
    required: true,
    validate: {
      validator: (value) => /^(http|https):\/\/[^ "]+$/.test(value),
      message: 'Invalid website URL'
    }
  },
  company: {
    name: { type: String, required: true },
    catchPhrase: { type: String, required: true },
    bs: { type: String, required: true }
  }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
🛠️ Error Handling
The API will return 400 Bad Request for any validation errors with a detailed error message.
Ensure all required fields are provided in the correct format.
🗃️ Database Connection
app.js
javascript
Copy code
const express = require('express');
const mongoose = require('mongoose');
const userRouter = require('./routes/UserRoutes');
const SERVER_PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());
app.use(userRouter);

const connectionString = "your-mongodb-connection-string";

mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Success Mongodb connection');
  app.listen(SERVER_PORT, () => {
    console.log(`Server is running on port ${SERVER_PORT}`);
  });
}).catch(err => {
  console.error('Error Mongodb connection', err);
});
⚠️ Notes
Ensure MongoDB is running locally or provide a valid MongoDB connection string.
Use tools like Postman or cURL to test API endpoints
