
var sqlite3 = require('sqlite3').verbose()


const DBSOURCE = "blog_db.db"

let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
      // Cannot open database
      console.error(err.message)
      throw err
    }else{
        
        db.run(`CREATE TABLE IF NOT EXISTS blogs(
		  ID INTEGER PRIMARY KEY AUTOINCREMENT,
		  Title VARCHAR(100) ,
		  SubTitle VARCHAR(100) ,
		  Author VARCHAR(100),
		  Post TEXT,
		  Likes INTEGER NOT NULL DEFAULT 0,
		  CreatedOn DATE DEFAULT current_timestamp,
		  UpdatedOn DATE DEFAULT current_timestamp
		)`,
        (err) => {
            if (err) {
                 console.error(err)
            }else{
                // Table just created, creating some rows
              
            }
        });

         db.run(`CREATE TABLE IF NOT EXISTS users(
          ID INTEGER PRIMARY KEY AUTOINCREMENT,
          Username VARCHAR(100) ,
          Password VARCHAR(100) ,
          CreatedOn DATE DEFAULT current_timestamp
        )`,
        (err) => {
            if (err) {
                 console.error(err)
            }else{
                // Table just created, creating some rows
                 // const insert = "INSERT INTO users (Username, Password) VALUES('admin1', 'pass')"
                 // db.run(insert, err => {
                 //    if(err) console.log(err)

                 //    console.log("User created")
                 // })
              
            }
        }); 

        
    }
});


module.exports = db



