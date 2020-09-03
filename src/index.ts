import dotenv from "dotenv";
import express from "express";
import { fetchInstituteEntries } from "./logic";

//Initalization
dotenv.config();

const app = express();

app.use(express.json());
app.use(express.static("public"));

app.get("/data", async (req, res) =>
{
  const data = await fetchInstituteEntries();
  res.send(data);
});

app.listen(process.env.PORT || 8080, () =>
{
  console.log("Server up!");
});