import mongoose from "mongoose";

const platSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true,
  },
  contenu: {
    type: Array,
    required: true,
  },
  taille: {
    type: String,
    required: true,
    default: "M",
  },
  prix: {
    type: Number,
    required: true,
  },
  total: {
    type: Array,
    required: true,
  },
});

const Plats = mongoose.model("Plats", platSchema);

export default Plats;
