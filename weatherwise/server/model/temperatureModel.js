import mongoose from "mongoose";

const tempScheme = new mongoose.Schema({
    cityID: {
        type: String,
        required: true,
        ref: 'City'
    },
    stateID: {
        type: String,
        required: true,
        ref: 'State'
    },
    countryID: {
        type: String,
        required: true,
        ref: 'Country'  
    },
    date: {
        type: Date,
        required: true,
    },
    // time: {
    //     type: String,
    //     required: true,
    //     validate: {
    //         validator: (v) => /^([01]\d|2[0-3]):[0-5]\d$/.test(v),
    //         message: (props) => `${props.value} is not a valid time!`,
    //     },
    // },
    temperature: {
        type: Array,
        required: true,
    }
})
const Temperature = mongoose.model('Temperature', tempScheme);

export default Temperature;