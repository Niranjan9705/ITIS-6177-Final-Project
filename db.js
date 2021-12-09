var sqlite3 = require('sqlite3').verbose()
const DBSOURCE = "db.sqlite" //database  name

class Db {
    constructor() {
        this.db = new sqlite3.Database(DBSOURCE, (err) => {
            if (err) {
                console.error(err.message)
                throw err
            } else {
                this.db.run(`CREATE TABLE user (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    username text UNIQUE, 
                    password text, 
                    CONSTRAINT usename_unique UNIQUE (username)
                    )`,
                    (err) => {
                    });
            }
        });
    }
    getDb = () => {
        return this.db
    }
}

module.exports = Db;