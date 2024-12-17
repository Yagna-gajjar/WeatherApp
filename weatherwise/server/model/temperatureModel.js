import mongoose from "mongoose";

const tempScheme = new mongoose.Schema({
    cityID: {
        type: String,
        required: true,
        ref: 'City'
    },
    date: {
        type: Date,
        required: true,
    },
    temperature: {
        type: Array,
        required: true,
    }
})
const Temperature = mongoose.model('Temperature', tempScheme);

export default Temperature;