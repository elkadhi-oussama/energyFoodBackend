console.clear();
import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import "dotenv/config";
import cors from "cors";
import Ingr from "./Models/ingrediant.js";
import Plat from "./Models/Plats.js";
// initial app
const app = express();
const PORT = 5000;
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
  origin:["https://deploy-mern-1whq.vercel.app"],
  methods:["POST", "GET", "DELETE"],
  credentials:true
}));
//end app

// connect DB

mongoose
  .connect("mongodb+srv://energyfood:92111140@energyfood.sqqkr75.mongodb.net/?retryWrites=true&w=majority&appName=energyfood", { dbName: "energyfood" })
  .then(() => console.log("DB connected"))
  .catch((error) => console.log("error when connected DB ", error));
// end connect db

//routes
//test routes
app.get("/",(req,res)=>{
  res.json("Hello Test!!!!!!")
})
//end test
// routes ingr
app.post("/add", async (req, res) => {
  try {
    const kca = req.body.protein * 4 + req.body.carbs * 4 + req.body.fat * 9;
    const newIngr = Ingr({ ...req.body, kcalories: kca });

    await newIngr.save();
    res.status(200).send({ msg: "ingredient added", newIngr });
  } catch (error) {
    res.status(500).send({ msg: "invalid request ", error });
  }
}); //end post

//get method
app.get("/data", async (req, res) => {
  try {
    const getData = await Ingr.find();
    res.status(200).send({ msg: "all ingredients gutted", getData });
  } catch (error) {
    res.status(500).send({ msg: "invalid request ", error });
  }
}); //end get
// delete method 
app.delete("/:id", async(req, res)=>{
  try {
    const idIngr = req.params.id;
    console.log(idIngr)
    const ingrDeleted = await Ingr.deleteOne({ _id: idIngr });
    ingrDeleted.deletedCount
      ? res.status(200).send({ msg: "Plat deleted succufully", platDeleted })
      : res.status(200).send({ msg: "Plat already deleted " });
  } catch (error) {
    res.status(500).send({ msg: "invalid request ", error });

  }
})
//end ingr

// routes Plats 
app.post("/plat/addplat", async (req, res) => {
  try {
    const newPlat = Plat({ ...req.body });

    await newPlat.save();
    res.status(200).send({ msg: "plat added", newPlat });
  } catch (error) {
    res.status(500).send({ msg: "invalid request ", error });
  }
}); //end post
//get method
app.get("/plat/dataplat", async (req, res) => {
  try {
    const getData = await Plat.find();
    res.status(200).send({ msg: "all plats gutted", getData });
  } catch (error) {
    res.status(500).send({ msg: "invalid request ", error });
  }
}); //end get

app.delete("/plat/:id", async (req, res) => {
  try {
    const idPlats = req.params.id;
    const platDeleted = await Plat.deleteOne({ _id: idPlats });
    platDeleted.deletedCount
      ? res.status(200).send({ msg: "Plat deleted succufully", platDeleted })
      : res.status(200).send({ msg: "Plat already deleted " });
  } catch (error) {
    res.status(500).send({ msg: "invalid request ", error });
  }
});

//end Plats
//end routes

// lancement serveur
app.listen(PORT, (err) => {
  if (err) {
    console.log("this error from server ", err);
  } else {
    console.log(`Server is running on http://localhost:${PORT}`);
  }
});
