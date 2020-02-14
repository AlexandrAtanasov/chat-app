const users = [];

const addUser = ({id, name, room }) => {
    // unify username and room name
    name = name.trim().toLowerCase();
    room = room.trim().toLowerCase();

    // checking the name of the user for matches with those already connected
    const existingUser = users.find( (user) => user.room === room && user.name == name);


    // warning user about required fields
    if(!name || !room) return { error: 'Username and room are required' };
    // warning user about busy name
    if (existingUser) {
        return {error: 'User name is taken'};
    };

    // creating a new user
    const user = { id, name, room };

    users.push(user);

    return {user};
};

const removeUser = (id) => {
    // serching user in users
    const index = users.findIndex( (user) => user.id === id );
    // deleting that user from users and return arr
    if (index !== -1) {
        return users.splice(index, 1)[0];
    }
};

const getUser = (id) => users.find( (user) => user.id === id );

const getUsersInRoom = (room) => users.filter( (user) => user.room === room );

module.exports = { addUser, removeUser, getUser, getUsersInRoom };