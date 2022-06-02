# attendance-system-backend

## Getting Started

To get the Node server running locally:

* Install [Dependencies](https://nodejs.org/en/)
* Clone this repo
* `npm install` to install all required packages.
* Install MongoDB Community Edition [instructions](https://docs.mongodb.com/manual/installation/#tutorials) or type `mongod` to start the MongoDB process.
* `npm run prog` runs the app in the development mode. Listens on http://localhost:5000. Server can be restarted by pressing 'rs' in command line.

## Environment Variables

* NODE_ENV- Determines the nature of the build.
* PORT- Determines which port it running on.
* MONGO_URI- Determines mongo url used.
* JWT_SECRET- Determines JSON Object used to verify JWT of client.
* EMAIL- Determines email of the adminstrator.
* PASSWORD- Determines password of the adminstrator.
* CLIENT_ID- Determines public identifier used for OAuth verification in third-party apps.
* CLIENT_SECRET- Determines the secret key used for authorization.
* ACCESS_TOKEN - Determines the token that grants access to the Google API.
* REQUEST_TOKEN - Determines the token used for connecting OAuth to the thrid-party app.
* OTP_KEY - Determines secret key used to verrify authenticity of Client.


## Available Endpoints

### GET /

Serves the fontend and sends a working html file.

### POST /api/admin/register 

Registers an admin with all his details. 

### POST /api/admin/login 

Authenticates an admin,and logs him in. 

### GET /api/admin/profile 

Gets the admin by his profile.

### PUT /api/admin/forgotPassword 

Admin requests an OTP to his mail.

### PUT /api/admin/reset 

Admin enters his OTP and resets his password.

### POST /api/teacher/register 

An 	admin 	registers a teacher with her details.

### POST /api/teacher/login 

A teacher logs in with the provided login details .

### GET /api/teacher/:id

Retrieves profile of that particular teacher by her ID.

### DELETE /api/teacher/:id 

An admin deletes a teacher by her ID.

### GET /api/teacher

Retrieves all teachers.

### POST /api/class/add

Admin adds a new class.

### GET /api/class/:id

Gets a class with details by id.

### PUT /api/class/:id

Admin updates class details.

### DELETE /api/class/:id

Admin deletes a class by class id.

### GET /api/class

Gets all classes.

### POST /api/student/register 

An admin registers student with his details.

### GET /api/student

Gets all students.

### GET /api/student/:id

Gets a particular student by his id.

### GET /api/student/byClass/:class_id

Gets all students in a class by class ID.

### POST /api/attendance/register 

Enters attendance of a student.

### PUT /api/attendance/:id 

Updates attendance of a student

### GET /api/attendance/byClass/:class_id

Gets all the attendance of students in a particular class.

### GET /api/student/byClass/lm/:class_id

Limits the fetched attendance of students to 20 records.




