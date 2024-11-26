import mongoose from 'mongoose';

const citySchema = new mongoose.Schema({
    cityName: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    state: {
        type: String,
        required: true,
        trim: true,
    },
    country: {
        type: String,
        required: true,
        trim: true,
    },
    temperature: {
        type: Array,
        required: true
    },
    date: {
        type: Date,
        default: () => new Date().setHours(0, 0, 0, 0),
    },
});

const City = mongoose.model('City', citySchema);

export default City;
