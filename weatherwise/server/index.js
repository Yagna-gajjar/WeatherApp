import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import routes from "./routes.js";

const app = express();
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors());
dotenv.config();

const mongourl = process.env.MONGOURL
const port = process.env.PORT || 5000;

mongoose.connect(mongourl).then(() => {

    console.log("DB connected");

    app.listen(port, () => {
        console.log(`server is running on port: ${port}`);
    })

}).catch(error => console.log(error));


app.use("/api", routes);