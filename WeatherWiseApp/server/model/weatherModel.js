import mongoose from "mongoose"

const weatherSchema = new mongoose.Schema({
    cityID: {
        type: String,
        ref: 'City',
        required: true
    },
    date: {
        type: String,
        required: true
    },
    hourly: [
        {
            time: {
                type: String
            },
            range: {
                type: String
            },
            temperature: {
                type: Number
            },
            humidity: {
                type: Number
            },
            windSpeed: {
                type: Number
            },
            status: {
                type: String
            },
            status_image: {
                type: String
            }
        }
    ]

});

export default mongoose.model('Weather', weatherSchema);
