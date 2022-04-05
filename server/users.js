// user management
const users = [];
const addUser = ({ id, name, room }) => {
  // tratamento dos nomes de usuário e sala
  name = name.trim().toLowerCase();
  room = room.trim().toLowerCase();

  // verificação de usuário logado
  const existingUser = users.find((user) => {
    user.room === room && user.name === name;
  });

  if (existingUser) {
    return { error: "Nome de usuário já logado" };
  }

  // criação e adição do novo usuário
  const user = { id, name, room };

  users.push(user);

  return { user };
};

const getUser = (id) => users.find((user) => user.id === id);


const removeUser = (id) => {
  const index = users.findIndex((user) => user.id === id);

  // removendo o usuário pelo indice
  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
};

const getUsersInRoom = (room) => users.filter((user) => user.room === room);

module.exports = {
  addUser,
  getUser,
  removeUser,
  getUsersInRoom,
};
