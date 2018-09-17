
const { DatabaseAPI } = require('./database')
const dbMeta = require('./dbSchema')
const DB_PATH = './sqlite.db'

var DB = new DatabaseAPI(DB_PATH, dbMeta.dbSchema)

// RUN QUERY  ==================================================================
//DB.registerUser("newuser9", "pass", "test@test9999.com")
// DB.registerUser("newuser2", "pass", "test@test4827.com")
// DB.registerUser("newuser3", "pass", "test@test5830.com")

// GET QUERY  ==================================================================
function printUserEmail(userInfo) {
    console.log("User's email is: " + userInfo.email)
}

DB.findUserByLogin('newuser9', printUserEmail)
// ALL QUERY  ==================================================================
function listUserEmails(userEmails) {
    userEmails.forEach(email => {
        console.log(email.email)
    });
}

DB.getUserEmailsAll(listUserEmails)

// EACH QUERY  =================================================================
DB.getUserEmailsEach(printUserEmail)
