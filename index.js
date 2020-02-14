// implement your API here

// import dependencies
const db = require("./data/db");
const express = require("express");
const cors = require('cors');

// Declare server variable
const server = express();

// Add middleware
server.use(express.json());
server.use(cors());


// Endpoints

server.get("/", async (req, res) => {
  res.json({
    message: "hello, world!"
  });
});

server.get("/users", async (req, res) => {
  console.log('aytoo')
  try {
    const users = await db.find();
    res.status(200).json(users);
  } catch {
    res
      .status(500)
      .json({ message: "The users information could not be retreived." });
  }
});

server.get("/users/:id", async (req, res) => {
  try {
    const user = await db.findById(req.params.id);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({
        message: "The user with the specified ID does not exist."
      });
    }
  } catch {
    res
      .status(500)
      .json({ message: "The user information could not be retrieved." });
  }
});

server.post("/users", async (req, res) => {
  const { name, bio } = req.body;
  try {
    if (name && bio) {
      const newUser = await db.insert(req.body);
      const data = await db.findById(newUser.id);
      res.status(201).json(data);
    } else {
      res
        .status(400)
        .json({ message: "Please provide name and bio for the user." });
    }
  } catch (err) {
    res
      .status(500)
      .json({
        message: "There was an error while saving the user to the database"
      });
  }
});

server.delete("/users/:id", async (req, res) => {
  const user = await db.findById(req.params.id);
  if (user) {
    try {
      await db.remove(req.params.id);
      const data = await db.find();
      res.status(200).json(data);
    } catch {
      res.status(500).json({ message: "The user could not be removed" });
    }
  } else {
    res
      .status(404)
      .json({ message: "The user with the specified ID does not exist." });
  }
});

server.put("/users/:id", async (req, res) => {
  const user = await db.findById(req.params.id);
  const { name, bio } = req.body;
  if (user) {
    try {
      if (!name || !bio) {
        res
          .status(400)
          .json({ message: "Please provide name and bio for the user." });
      } else {
        await db.update(req.params.id, req.body);
        updatedUser = await db.findById(req.params.id);
        res.status(200).json(updatedUser);
      }
    } catch {
      res
        .status(500)
        .json({ message: "The user information could not be modified." });
    }
  } else {
    res
      .status(404)
      .json({ message: "The user with the specified ID does not exist." });
  }
});

// Server Stuff
const PORT = 8080;

server.listen(PORT, () => {
  console.log(
    `%c
 --------------------------------------------------------------
 |       ___                                                   |
 |      (^o^) <Server is running on http://localhost:${PORT}>     |
 |     ((___))                                                 |
 |       ^ ^                                                   |
 --------------------------------------------------------------
        `,
    "font-family:monospace"
  );
});
