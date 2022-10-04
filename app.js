// Require file
const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
const mongoose = require("mongoose");

// server name
// const hostname = '1.1.1';
const port = 80;

// set express engine
app.set("view engine", "pug");

// use path // render page
app.set("views", path.join(__dirname, "views"));
app.get("/", (req, res) => {
  res
    .status(200)
    .render("home", {
      title: "Hey I am pug",
      message: "Hello there!, Iam pug",
    });
});
// path contract
app.set("views", path.join(__dirname, "views"));
app.get("/contract", (req, res) => {
  mess = "IF you want to contract us fill the form and send it..";
  res.status(200).render("contract", { sendMess: mess });
});
// path about
app.get("/about",(req,res) =>{
  res.status(200).render("about")
})
// path sing-in
app.get("/login",(req,res)=>{
  res.status(200).render("login")
})
// path sing-up
app.get("/sing-up",(req,res)=>{
  res.status(200).render("singup")
})
// connect mongose use mongoose
main().catch((err) => console.log(err));
main().then(() => console.log("Server connect successful"));
async function main() {
  await mongoose.connect("mongodb://localhost:27017/Fas");
}
const kittySchema = new mongoose.Schema({
   name: String,
   email: String,
   addr: String,
   mess: String,
});
const Kitten = mongoose.model("fas-datas", kittySchema);
// file send
app.use(express.urlencoded());
app.post("/contract", (req, res) => {
  Name = req.body.name;
  mes = req.body.mess;
const myData = new Kitten(req.body);
myData.save().then(()=>{
const cont = `Thanks ${Name} for contract us we replay to you soon ase possible Thank's`;
res.status(200).render("contract", { mes: cont })}).catch(()=>res.send('Data not send'))

  const contract = `name: ${Name},  contract ${mes}`;
  fs.writeFileSync("con.txt",contract)
});

// image path
app.use("/img", express.static(path.join(__dirname, "/img")));

// server listen
app.listen(port, () => {
  console.log(`Server running at localhost:${port}/`);
});


