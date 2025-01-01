import mongoose from 'mongoose';

const stateSchema = new mongoose.Schema({
    stateName: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    countryID: {
        type: String,
        ref: 'Country',
        required: true
    },
});

const State = mongoose.model('State', stateSchema);

export default State;
