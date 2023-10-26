# User Management Microservice

The User Management Microservice is a Node.js application that serves as a gateway for managing user information and activities. It provides a RESTful API for adding, editing, removing, and retrieving user data. The microservice utilizes MongoDB as the database for storing user information and is intended to be run locally on port 3000.

## Endpoints

### 1. Add User

- **Endpoint**: `POST /api/users/add`
- **Description**: Add a new user to the database.
- **Request Format**:
  ```json
  {
    "name": "John",
    "surname": "Doe",
    "email": "john.doe@example.com",
    "phoneNumber": "123-456-7890",
    "nationality": "US",
    "language": "English"
  }
- **Response**: The user is added to the database, and the microservice responds with the newly created user in JSON format.
### 2. Get User by ID
- **Endpoint**: **`GET /api/users/:userId`**
- **Description**: Retrieve a user by their unique user ID.
- **Response**: If a user with the specified ID exists in the database, the microservice responds with the user's information in JSON format. If the user does not exist, a 404 status code is returned with an error message.
## Usage
To use the User Management Microservice, send HTTP requests to the specified endpoints using any tool capable of making HTTP requests (e.g., Postman, cURL) or by integrating it with your application. To run this service you can run `node app.js``

