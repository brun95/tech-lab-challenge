# TECH-LAB CHALLENGE

In this project I developed the client side with React and the server side with ExpressJs, both with Typescript.
With Jest, I implemented some unit tests, with more than 60% of code coverage on the Back-end side.
I used SQLite as database, as this is a very simple app overall.
For styling, I used Tailwindcss.

I used bcrypt for the encryption of the password of the admin, in order to login.
The admin can login in /login with the following credentials, that are stored (with hashed password) in the users table:

```
    email:      admin@domain.com
    password:   password123
```


# STEPS TO RUN

If you have Docker installed, you can simply go inside the tech-lab-challenge root folder and run:

```
docker-compose up
```

This will create the client container running on http://localhost:3000 and the server container running on http://localhost:3001

If you don't have Docker, you can also:

```
cd server

npm start

//to run tests:
npm test
```
This will create a server running on port 3001 by default.

Then start the client:

```
cd client

npm start

//to run tests:
npm test
```

