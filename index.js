// Import necessary modules
import express from "express";
import bodyParser from "body-parser";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import "dotenv/config";
import { getSign, getZodiac } from "horoscope";

// Create an instance of an express application
const app = express();
app.use(express.json());

// Set the port the application will be running on
const port = process.env.PORT || 3001;

// Get the directory name using fileURLToPath and dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Use body-parser middleware to parse incoming JSON requests
app.use(bodyParser.json());

// Serve static files from the 'public' directory
app.use(express.static(join(__dirname, "public")));

// Serve HTML form to submit data
app.get("/", (req, res) => {
  res.sendFile(join(__dirname, "index.html"));
});

app.post("/submit", (req, res) => {
  let firstName = req.body.firstName;
  let lastName = req.body.lastName;
  let dob = req.body.dob;

  let userDOB = date.split("-");

  let month = 5;
  let day = 18;
  let userHoroscope = getSign({
    month: Number(userDOB[1]),
    day: Number(userDOB[2]),
  });
  let userZodiac = getZodiac(Number(userDOB[0]));

  //updating response back to web
  const response = {
    message: `Thank You ${firstName} ${lastName}! Yourdata of birth is ${dob}. Sumission Successful`,
    horoscope: `Given your date of birth, you horoscopr is ${userHoroscope} while your Zodiac sign is ${userZodiac}`,
    sign: userHoroscope,
  };
  res.json(response);
});

let date = "2023-11-27";

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
