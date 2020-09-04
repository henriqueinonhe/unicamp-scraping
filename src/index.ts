import dotenv from "dotenv";
import express from "express";
import { Database } from "./Database";

(async () =>
{
  //Initalization
  dotenv.config();
  await Database.initialize();

  const app = express();

  app.use(express.json());
  app.use(express.static("public"));
  
  app.get("/professors", async (req, res) =>
  {
    res.send(await Database.fetchProfessorsInitialData());
  });
  
  app.get("/professors/:name", async (req, res) =>
  {
    const { name } = req.params;
    res.send(await Database.fetchProfessorData(name));
  });
  
  app.listen(process.env.PORT || 8080, () =>
  {
    console.log("Server up!");
  });
  
})();

