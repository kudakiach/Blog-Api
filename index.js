const express = require('express');
const app = express();
const port = 3000;
const sqlite3 = require('sqlite3').verbose();
const path = require('path')

const cookieParser = require("cookie-parser");
const sessions = require('express-session');

const adminRoute = require("./routes/author.js")
const userRoute = require("./routes/reader.js")


//set the app to use ejs for rendering
app.set('view engine', 'ejs');
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(sessions({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized:true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 },
    resave: false
}));

app.use('/', adminRoute);
app.use('/', userRoute);

//this adds all the userRoutes to the app under the path /user


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

