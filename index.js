const express = require("express");
const path = require("path");
const mysql = require("mysql2"); //sql connection
const app = express();
const methodOverride = require("method-override"); //patch put method ko overriede karne ke liye ejs file dekhna hai iske liye form ka
const { v4: uuidv4 } = require("uuid"); //uuid ke liye
const multer = require("multer");
const fs = require("fs");
const port =  8000;
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/Views"));
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use(methodOverride("_method")); //patchmethod dekehega
app.use(express.urlencoded({ extended: true })); 
app.listen(port,()=>{
    console.log(`Running on port : ${port}`);
    }
)
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "my_app1",
  }); //connection to database

// Set up multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "images/"); // Specify where to store the uploaded files
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + "-" + file.originalname); // Unique filename
    }
  });
  
const upload = multer({ storage: storage });
  














app.get("/post", (req, res) => {
    let q = `select * from posts`;
    try {
      connection.query(q, (err, posts) => {
        if (err) throw err;
        res.render("index.ejs", { posts });
      });
    } catch (err) {
      console.log(err);
    }

    
})

app.get("/post/posts",(req,res)=>{
    res.render("index");
})
app.get("/post/add",(req,res)=>{
    res.render("create");
})
app.get("/post/detail",(req,res)=>{
    res.render("detail");
})

app.post("/post", upload.single("file"), (req, res) => {
    let {username, title, description,} = req.body;
    const file = req.file
    q = `insert into posts(id,username,title,description,filename,filepath) values('${uuidv4()}','${username}','${title}','${description}','${file.filename}','/images/${file.filename}')`;
    try {
        connection.query(q, (err, result) => {
            if (err) throw err;
            console.log(result);
            res.send("success");
        });
      } catch (err) {
        console.log(err);
      }


//------------------------------------
// let { username, title, description } = req.body;
// const file = req.file;

// // Log form data and file details to console
// console.log("Form Data:", { username, title, description });
// console.log("Uploaded File:", file);

// // Return a success response
// res.send("File uploaded and form data received!");
//     //------------------




    // const q = "INSERT INTO files (filename, filepath) VALUES (?, ?)";
    // const values = [file.filename, file.path];

    // connection.query(q, values, (err, result) => {
    //     if (err) {
    //         console.log(err);
    //         return res.status(500).send("Database error");
    //     };
    // });

});
app.get("/post/update", (req, res) => {
    res.render("update");
});



