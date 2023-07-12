const express = require("express");
const router = express.Router();
const db = require("../model/helper");
const petMustExist = require("../model/guards/petMustExist");
const userShouldBeLoggedIn = require("../model/guards/userShouldBeLoggedIn");


// Get pet list
router.get('/', userShouldBeLoggedIn, (req, res) => {
  db(`SELECT * FROM petlist WHERE user_id=${req.user_id};`)
    .then(results => {
      res.send(results.data);
    })
    .catch(err => res.status(500).send(err));
});


// GET one pet
router.get("/:id", userShouldBeLoggedIn, async function(req, res) {
  const petId = req.params.id; // Get the pet ID from the URL parameter
  try {
    const results = await db(`SELECT * FROM petlist WHERE user_id=${req.user_id} AND id = ${petId};`);
    if (results.data.length) {
      res.send(results.data[0]);
    } else {
      res.status(404).send({ message: "Pet was not found" });
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

//CREATE a new pet
router.post("/", userShouldBeLoggedIn, async function(req,res) {
  const {name, type, birthdate, notes} = req.body;
  try{
    const results = await db(
    `INSERT INTO petlist (name, type, birthdate, notes, user_id) VALUES("${name}","${type}","${birthdate}","${notes}", "${req.user_id}");`
    );
    res.send({message:'Pet was added'})
  } catch(err){
    console.log(err)
    res.status(500).send(err);
  }
})


// EDIT/ UPDATE a pet
router.put('/:pet_id', userShouldBeLoggedIn, async (req, res) => {
  const { pet_id } = req.params;
  const {name, type, birthdate, notes} = req.body;

  try {
    let myQuery = `UPDATE petlist SET `;
    if (name) {
      myQuery += `name = '${name}', `;
    }
    if (type) {
      myQuery += `type = '${type}', `;
    }
    if (birthdate) {
      myQuery += `birthdate = '${birthdate}', `;
    }
    if (notes) {
      myQuery += `notes = '${notes}', `;
    }
    myQuery = myQuery.slice(0, -2); // Remove the trailing comma and space
    myQuery += ` WHERE id = ${pet_id};`;
    const updatedItem = await db(myQuery);
    res.send(updatedItem);
  } catch (err) {
    res.status(500).send(err);
  }
});

// DELETE a pet
router.delete("/:pet_id", petMustExist, userShouldBeLoggedIn, async (req, res) => {
  const { pet_id } = req.params;
  try {
    await db(`DELETE FROM petlist WHERE id = ${ pet_id };`);
    res.send("Pet removed");
  } catch (err) {
    res.status(500).send(err);
  }
});



module.exports = router;
