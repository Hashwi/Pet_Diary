const express = require('express');
const router = express.Router();
const db = require("../helper");

async function petMustExist(req, res, next) {
  const { id } = req.params;
  try {
    const results = await db(`SELECT * FROM petlist WHERE id = ${id}`);
    if (results.data.length) {
      next();
    } else {
      res.status(404).send({ message: "pet not found" });
    }
  } catch (err) {
    res.status(500).send(err);
  }
}

module.exports = petMustExist;