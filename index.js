import express from "express";
import axios from "axios"
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const api_key = "735516fe1459d7426a86a32a910eb1e0";

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.render("index.ejs", { weather: " enter your place  ", icon: "01d", temp: "temperature", min_temp: "min_temp" , max_temp: "max_temp" , real_feel:"10" , wind_speed:"12" , humidity_level:23 , pressure_level:"123"});
});

app.post("/report", async (req, res) => {
    let place = req.body.weather__searchform;
    try {
        const result = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${place}&appid=${api_key}`);
        const data = result.data;
        const temperature = data.main.temp - 273;
        const min_temperature = data.main.temp_min - 273;
        const max_temperature = data.main.temp_max - 273;
        const feel_like = data.main.feels_like - 273;
        res.render("index.ejs", { weather: data.weather[0].main, icon: data.weather[0].icon, temp: temperature.toFixed(2), min_temp: min_temperature.toFixed(2) , max_temp: max_temperature.toFixed(2) , real_feel: feel_like.toFixed(2) , wind_speed: data.wind.speed , humidity_level: data.main.humidity , pressure_level: data.main.pressure});
    } catch (error) {
        res.render("index.ejs", { weather: "please enter a corecct place"});
    }
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
});