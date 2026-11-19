// Import the required packages
import express from "express";
import axios from "axios";

// Create the Express application
const app = express();
const port = 3000;

// Set EJS as our view engine
app.set("view engine", "ejs");

// Tell Express where our CSS files are located
app.use(express.static("public"));

// Harry Potter public API
const API_URL = "https://hp-api.onrender.com/api/characters";

// Main route
app.get("/", async (req, res) => {
  try {
    // Get the search input from the user
    const search = req.query.search || "";

    // Request character data from the API using Axios
    const response = await axios.get(API_URL);

    // Store all characters
    const allCharacters = response.data;

    // Filter characters by name if the user searches
    const characters = allCharacters.filter((character) =>
      character.name.toLowerCase().includes(search.toLowerCase())
    );

    // Send data to the EJS page
    res.render("index", {
      characters: characters,
      search: search,
      total: allCharacters.length
    });

  } catch (error) {
    // Display errors in the terminal
    console.error("API Error:", error.message);

    // Show an error page/message to the user
    res.status(500).render("index", {
      characters: [],
      search: req.query.search || "",
      total: 0,
      error: "Unable to load Harry Potter characters. Please try again later."
    });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Harry Potter website is running at http://localhost:${port}`);
});