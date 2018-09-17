const sqlite3 = require('sqlite3').verbose()



function DatabaseAPI(DB_PATH, dbSchema) {
    const DB = new sqlite3.Database(DB_PATH, function(err){
            if (err) {
                console.log(err)
                return
            }
            console.log('Connected to ' + DB_PATH + ' database.')

            DB.exec('PRAGMA foreign_keys = ON;', function(error)  {
                if (error){
                    console.error("Pragma statement didn't work.")
                } else {
                    console.log("Foreign Key Enforcement is on.")
                }
            });
        });

    DB.exec(dbSchema, function(err){
        if (err) {
            console.log(err)
        }
    });


    return {
        registerUser: function(login, password, email) {
            var sql= "INSERT INTO Users (login, password, email) "
            sql += "VALUES (? ,?, ?) "

            DB.run(sql, [login, password, email], function(error) {
                if (error) {
                    console.log(error)
                } else {
                    console.log("Last ID: " + this.lastID)
                    console.log("# of Row Changes: " + this.changes)
                }
            });
        },
        findUserByLogin: function(user_login, _callback) {
            var sql = 'SELECT email '
            sql += 'FROM Users '
            sql += 'WHERE login = ? '


            DB.get(sql, user_login, function(error, row) {
                if (error) {
                    console.log(error)
                    return
                }

                _callback(row)
            });
        },
        getUserEmailsAll: function(_callback) {
            var sql = 'SELECT email '
            sql += 'FROM Users '

            DB.all(sql, [], function(error, rows) {
                if (error) {
                    console.log(error)
                    return
                }

                _callback(rows)
            });
        },
        getUserEmailsEach: function(_callback) {
            var sql = 'SELECT email '
            sql += 'FROM Users '

            DB.each(sql, [], function(error, row){
                if (error) {
                    console.log(error)
                    return
                }

                _callback(row)
            });
        }
    }
}

module.exports = { DatabaseAPI }