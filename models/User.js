const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, '../public/data/users.json');

class User {
    constructor(username, email, password) {
        if (!username || !email || !password) {
            throw new Error('Username, email, and password are required');
        }
        this.username = username;
        this.email = email;
        this.password = password;
    }

    static getUsersData() {
        try {
            const data = fs.readFileSync(filePath, 'utf8');
            return JSON.parse(data);
        } catch (err) {
            return [];
        }
    }

    static saveUsersData(usersData) {
        if (!fs.existsSync(filePath)) {
            fs.writeFileSync(filePath, '[]');
        }
        fs.writeFileSync(filePath, JSON.stringify(usersData));
    }

    static addUser(user) {
        const usersData = User.getUsersData();
        usersData.push(user);
        User.saveUsersData(usersData);
    }

}

module.exports = User;