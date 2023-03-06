const express = require("express");
const router = express.Router();
const assert = require('assert');
const db = require('../database')



router.get("/home", (req, res) => {

const sql = "SELECT * FROM blogs ORDER BY Title"
  db.all(sql, [], (err, rows) => {
    if (err) {
      return console.error(err.message);
    }
    console.log(rows)
    res.render("home", { model: rows, loggedIn:false});
  });

});

router.post("/update/:id", (req, res) => {
 id = req.params.id
  const data = [id];
  const sql = "UPDATE blogs SET Likes = Likes + 1 WHERE (ID = ?)";
  db.run(sql, id, err => {
    if (err) console.log(err)
    res.redirect("/home");
  });
});

module.exports = router;
