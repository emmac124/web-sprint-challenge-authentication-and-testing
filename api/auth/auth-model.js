const db = require("./../../data/dbConfig")

const insert = (user) => {
    return db("users")
        .insert(user)
        .then((id) => {
            return db("users").where("id", id[0])
        })
}

const getByUsername = (username) => {
    return db("users")
        .where("username", username)
        .then((res) => {
            return res[0]
        })
}

module.exports = {
    insert,
    getByUsername
}