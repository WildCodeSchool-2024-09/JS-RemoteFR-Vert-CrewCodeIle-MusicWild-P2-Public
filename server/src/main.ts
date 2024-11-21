// Load environment variables from .env file
import "dotenv/config";

// Check database connection
// Note: This is optional and can be removed if the database connection
// is not required when starting the application
import "../database/checkConnection";

// Import the Express application from ./app
import app from "./app";

const dataArtist = require("../database/data/artist.json");

app.get("/artist", async (req, res) => {
  res.json(dataArtist);
});
app.get("/albums", async (req, res) => {
  const data = require("../database/data/album.json");
  res.json(data);
});
app.get("/artist/:id", async (req, res) => {
  res.json(
    dataArtist.filter((i: { id: number }) => i.id === Number(req.params.id)),
  );
});
app.get("/albums/:id", async (req, res) => {
  const data = require("../database/data/tracklist.json");
  res.json(data.filter((i: { id: number }) => i.id === Number(req.params.id)));
});

// Get the port from the environment variables
const port = process.env.APP_PORT;

// Start the server and listen on the specified port
app
  .listen(port, () => {
    console.info(`Server is listening on port ${port}`);
  })
  .on("error", (err: Error) => {
    console.error("Error:", err.message);
  });
