const users = []

userJoin = (id, username, room) => {
    const user = { id, username, room};

    users.push(user);

    return user;
}

getCurrentUser = (id) => {
    return users.find(user => user.id === id);
}

module.exports = {
    userJoin,
    getCurrentUser
}