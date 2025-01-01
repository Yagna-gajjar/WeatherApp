import mongoose from 'mongoose';

const citySchema = new mongoose.Schema({
    cityName: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    stateID: {
        type: String,
        ref: 'State',
        required: true
    },
    countryID: {
        type: String,
        ref: 'Country',
        required: true
    }
});

const City = mongoose.model('City', citySchema);

export default City;