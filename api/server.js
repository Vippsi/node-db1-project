const express = require("express");

const db = require("../data/dbConfig.js");

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  res.status(200).json({ api: "up" });
});

server.get("/api/accounts", (req, res) => {
  db("accounts")
    .then((accounts) => {
      res.status(200).json({ data: accounts });
    })
    .catch((err) => {
      console.log(error);
      res.status(500).json({ error: err.message });
    });
});

server.get("/api/accounts/:id", (req, res) => {
  const accountId = req.params.id;

  db("accounts")
    .where({ id: accountId })
    .then((account) => {
      if (account.length > 0) {
        res.status(200).json({ data: account });
      } else {
        res.status(404).json({ message: "Not found" });
      }
    })
    .catch((err) => {
      console.log(error);
      res.status(500).json({ error: err.message });
    });
});

server.post("/api/accounts", (req, res) => {
  const newAccount = req.body;
  db("accounts")
    .returning("id")
    .insert(newAccount)
    .then((ids) => {
      res.status(201).json({ inserted: ids });
    })
    .catch((err) => {
      console.log(error);
      res.status(500).json({ error: err.message });
    });
});

server.put("/api/accounts/:id", (req, res) => {
  const accountId = req.params.id;
  const changes = req.body;

  db("accounts")
    .where({ id: accountId })
    .update(changes)
    .then((count) => {
      if (count) {
        res.status(200).json({ message: "updated successfully" });
      } else {
        res.status(404).json({ message: "not found" });
      }
    })
    .catch((err) => {
      console.log(error);
      res.status(500).json({ error: err.message });
    });
});

server.delete("/api/accounts/:id", (req, res) => {
  const accountId = req.params.id;

  db("accounts")
    .where({id: accountId})
    .del()
    .then((count) => {
      if (count) {
        res.status(200).json({ message: "removed successfully" });
      } else {
        res.status(404).json({ message: "not found" });
      }
    })
    .catch((err) => {
      console.log(error);
      res.status(500).json({ error: err.message });
    });
});

module.exports = server;
