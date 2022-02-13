const { User } = require('../models');

const userData = [{
        first_name: "Sam",
        last_name: "Smith",
        email: "samsmith@email.com",
        password: "password1",
        bio: "I listen to all kinds of music every day",
        gender: "non-binary",
        sexual_preference: "pansexual",
        pronouns: "they/them",
        birthday: 03 / 03 / 2003
    },
    {
        first_name: "Laura",
        last_name: "Lee",
        email: "lauralee@email.com",
        password: "password1",
        bio: "I have over 50 plants",
        gender: "female",
        sexual_preference: "bisexual",
        pronouns: "she/her",
        birthday: 01 / 01 / 2000
    },
    {
        first_name: "Frankie",
        last_name: "Gray",
        email: "frankie@email.com",
        password: "password1",
        bio: "I love hiking and travelling",
        gender: "male",
        sexual_preference: "homosexual",
        pronouns: "he/they",
        birthday: 07 / 07 / 1997
    }
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;