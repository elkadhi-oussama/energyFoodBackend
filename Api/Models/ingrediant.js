import mongoose from "mongoose";


const ingSchema = new mongoose.Schema({
    nom:{
        type: String,
        required : true
    },
    type:{
        type: String,
        required : true
    },
    protein:{
        type: Number,
        required : true
    },
    carbs:{
        type: Number,
        required : true
    },
    fat:{
        type: Number,
        required : true
    },
    kcalories:{
        type: Number
    },
})

const Ingr = mongoose.model("Ingr",ingSchema )

export default Ingr