const User = require('./models/users'); // Assuming your User model is in a separate file

// Insert a new user into the database
/*
User.create({
  firstName: 'John',
  lastName: 'Doe'
})
.then(newUser => {
  console.log('New user created:', newUser);
})
.catch(error => {
  console.error('Error creating user:', error);
});*/

// Retrieve all users from the database
User.findAll()
  .then(users => {
    // Iterate over the array of users and log each user's details
    users.forEach(user => {
      console.log(user.toJSON()); // Convert the Sequelize instance to a plain JSON object
    });
  })
  .catch(error => {
    console.error('Error retrieving users:', error);
  });
