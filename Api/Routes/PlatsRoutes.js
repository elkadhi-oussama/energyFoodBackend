import express from "express";
import Plat from "../Models/Plats.js";

const router = express.Router();

// post method
router.post("/addplat", async (req, res) => {
  try {
    const newPlat = Plat({ ...req.body });

    await newPlat.save();
    res.status(200).send({ msg: "plat added", newPlat });
  } catch (error) {
    res.status(500).send({ msg: "invalid request ", error });
  }
}); //end post
//get method
router.get("/dataplat", async (req, res) => {
  try {
    const getData = await Plat.find();
    res.status(200).send({ msg: "all plats gutted", getData });
  } catch (error) {
    res.status(500).send({ msg: "invalid request ", error });
  }
}); //end get

router.delete("/:id", async (req, res) => {
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

export default router;
