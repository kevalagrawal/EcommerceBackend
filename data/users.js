// In-memory user storage
let users = [];
let userIdCounter = 1;

const addUser = (user) => {
  const newUser = {
    id: userIdCounter++,
    ...user,
    createdAt: new Date()
  };
  users.push(newUser);
  return newUser;
};

const findUserByEmail = (email) => {
  return users.find(u => u.email === email);
};

const findUserById = (id) => {
  return users.find(u => u.id === id);
};

module.exports = {
  users,
  addUser,
  findUserByEmail,
  findUserById
};