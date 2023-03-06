
/**
 * These are example routes for user management
 * This shows how to correctly structure your routes for the project
 */

const express = require("express");
const router = express.Router();
const assert = require('assert');
const db = require('../database')



router.get("/", (req, res) => {
const session = req.session;
if(session.userid){
const sql = "SELECT * FROM blogs WHERE Author= ? ORDER BY Title"
  db.all(sql, [session.userid], (err, rows) => {
    if (err) {
      return console.error(err.message);
    }
    console.log(rows)
    res.render("index", { model: rows, username:session.userid, loggedIn:true });
  });
}else{
res.redirect('/login')}
});

router.get("/setting", (req, res) => {
  const session = req.session;
    res.render("setting", { model:{}, username:session.userid, loggedIn:true });
});

router.get("/users", (req, res) => {
  const sql = "SELECT * FROM users Where Username= ? ";
  db.get(sql, "admin", (err, row) => {
   if (err) console.log(err)
    console.log("User", row)
    // res.render("user", { model: row, username:session.userid, loggedIn:true });
  });
});

router.post("/create", (req, res, next) => {
  const session = req.session;
  if(session.userid){
  db.run(
    "INSERT INTO blogs ('Title', 'SubTitle', 'Author', 'Post' ) VALUES( ?, ?, ?, ? );",
    [req.body.Title, req.body.SubTitle,session.userid, req.body.Post],
    function (err) {
      if (err) {
      console.error(err); //send the error on to the error handler
      } else {
        res.redirect("/");
        next();
      }
    }
  );
  }else{
    res.redirect('/login')
  }
});

// router.post("/draft", (req, res, next) => {
//   onst session = req.session;
//   if(session.userid){
//   db.run(
//     "INSERT INTO blogs ('Title', 'SubTitle', 'Author', 'Post' ) VALUES( ?, ?, ?, ? );",
//     [req.body.Title, req.body.SubTitle,session.userid, req.body.Post],,
//     function (err) {
//       if (err) {
//       console.error(err); //send the error on to the error handler
//       } else {
//         res.redirect("/");
//         next();
//       }
//     }
//   );
//   }else{
//     res.redirect('/login')
//   }
// });


router.get("/edit/:id", (req, res) => {
  const session = req.session;

if(session.userid){
  const id = req.params.id;
  const sql = "SELECT * FROM blogs WHERE ID = ?";
  db.get(sql, id, (err, row) => {
   if (err) console.log(err)
    res.render("edit", { model: row, username:session.userid, loggedIn:true });
  });
}else{
  res.redirect('login')
}
});


router.post("/edit/:id", (req, res) => {
   const session = req.session;
  const id = req.params.id;
  const blog = [req.body.Title, req.body.SubTitle, session.userid, req.body.Post, id];
  const sql = "UPDATE blogs SET Title = ?, SubTitle=?, Author = ?, Post = ?, UpdatedOn = ? WHERE (ID = ?)";
  db.run(sql, blog, err => {
    if (err) console.log(err)
    res.redirect("/");
  });
});

router.get("/delete/:id", (req, res) => {
  const session = req.session;
  const id = req.params.id;
  const sql = "SELECT * FROM blogs WHERE ID = ?";
  db.get(sql, id, (err, row) => {
     if (err) {
      console.log(err)
    }
    res.render("delete", { model: row, username:session.userid, loggedIn:true });
  });
});


router.post("/delete/:id", (req, res) => {
  const id = req.params.id;
  const sql = "DELETE FROM blogs WHERE ID = ?";
  db.run(sql, id, err => {
    // if (err) ...
    res.redirect("/");
  });
});

router.get('/login', (req, res) =>{
  res.render('login', {loggedIn:false})
})

router.post('/login',(req,res) => {
   const data = [req.body.username, req.body.password];
  const sql = "SELECT * FROM users WHERE Username = ? AND Password = ?";
 
   db.get(sql, data, (err, row) => {
    if (err) {
      console.log(err)
    }
        const session=req.session;
        session.userid=req.body.username;
        console.log("roe", req.body.username)
        res.redirect("/");
   
  });
    
})

router.get('/logout',(req,res) => {
    req.session.destroy();
    res.redirect('/login');
});

module.exports = router;
