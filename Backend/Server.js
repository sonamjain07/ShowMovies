import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

import DbConfig from "./Config/DB.js"
import MoviesRoute from "./Routes/MoviesRoute.js"
import MoviesDetailRoute from "./Routes/MoviesDetailRoute.js";



const app = express();
app.use(cors());
app.use(bodyParser.json());


DbConfig();

app.use("/api/movies",MoviesRoute)
app.use("/api/moviesdetail", MoviesDetailRoute)






let Port = process.env.PORT || 5000;
app.listen(Port,() => {
    console.log("Server is running on",Port)
})