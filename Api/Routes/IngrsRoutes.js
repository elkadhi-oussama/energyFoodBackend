import express from "express";
import Ingr from "../Models/ingrediant.js";

const router = express.Router();

// post method
router.post("/add", async (req, res) => {
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
router.get("/data", async (req, res) => {
  try {
    const getData = await Ingr.find();
    res.status(200).send({ msg: "all ingredients gutted", getData });
  } catch (error) {
    res.status(500).send({ msg: "invalid request ", error });
  }
}); //end get
// delete method 
router.delete("/:id", async(req, res)=>{
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
// end delete 

export default router;
