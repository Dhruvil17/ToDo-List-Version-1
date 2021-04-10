const express = require("express");
const date = require(__dirname + "/date.js");
const app = express();

let items = ["Buy", "Cook Food", "Eat Food"];
let workItems = [];

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", function(req, res){
  const day = date.getDate();
  res.render("list", { listTitle: day, newListItems: items });
})

app.post("/", function (req, res) {
  const item = req.body.newItem;
  if (req.body.list === "Work List")
  {
    workItems.push(item);
    res.redirect("/work");
  }
  else
  {
    items.push(item);
    res.redirect("/");
  }
});

app.get("/work", function (req, res) {
  res.render("list", { listTitle: "Work List", newListItems: workItems })
});

app.get("/about", function (req, res) {
  res.render("about");
});

app.post("/reset", function (req, res) {
  if (req.body.list === "Work List")
  {
    workItems = [];
    res.redirect("/work");
  }
  else
  {
    items = ["Buy", "Cook Food", "Eat Food"]
    res.redirect("/"); 
  }
});

app.listen(3000, function () {
  console.log("Server is live and running on port 3000.");
});
