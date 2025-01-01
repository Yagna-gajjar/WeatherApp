import mongoose from "mongoose"

const weatherSchema = new mongoose.Schema({
    cityID: {
        type: String,
        ref: 'City',
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    hourly: [
        {
            time: {
                type: String,
                required: true
            },
            range: {
                type: String,
                required: true
            },
            temperature: {
                type: Number,
                required: true
            },
            humidity: {
                type: Number,
                required: true
            },
            windSpeed: {
                type: Number,
                required: true
            },
            condition: {
                type: String,
                required: true
            }
        }
    ]

});

export default mongoose.model('Weather', weatherSchema);
