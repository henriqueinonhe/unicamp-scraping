import dotenv from "dotenv";
import express from "express";
import { Database } from "./Database";
import { scrapeData } from "./scraping";

//Initalization
dotenv.config();

scrapeData();

// const app = express();

// app.use(express.json());
// app.use(express.static("public"));

// app.get("/professors", async (req, res) =>
// {
//   res.send(await Database.fetchProfessorsInitialData());
// });

// app.listen(process.env.PORT || 8080, () =>
// {
//   console.log("Server up!");
// });
