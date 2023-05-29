const express = require("express");
const router = express.Router();
const db = require("../model/helper");
const petMustExist =require("../model/guards/petMustExist");


// Get pet list
router.get('/', function(req, res, next) {
  console.log('abd')
  db("SELECT * FROM petlist;")
    .then(results => {
      res.send(results.data);
    })
    .catch(err => res.status(500).send(err));
});

// GET one pet
router.get("/:id", petMustExist, async function(req, res, next){

  const { id } = req.params;
  try {
    const results = await db(`SELECT * FROM petlist WHERE id = ${id}`);
    if (results.data.length) {
      res.send(results.data[0]);
    } else res.status(404).send({ message: "Pet was not found" });
  } catch (err) {
    res.status(500).send({ message: err });
  }
})


//INSERT a new pet

router.post("/", async function(req,res,next){
  console.log('this works')
  const {name, type, birthdate, notes} = req.body;
  try{
    await db(
    `INSERT INTO petlist (name, type, birthdate, notes) VALUES("${name}","${type}","${birthdate}","${notes}")`
    );
    res.send({message:'Pet was Added'})

  } catch(err){
    console.log(err)
    res.status(500).send(err);

  }
})

// EDIT/ UPDATE a pet
router.put('/:id', async (req, res, next) => {
  console.log('this works');
  const { id } = req.params;
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
    myQuery += ` WHERE id = ${id};`;
    console.log(myQuery);
    await db(myQuery);

    const updatedItem = await db(`SELECT * FROM petlist WHERE id = ${id};`);
    res.send(updatedItem);
  } catch (err) {
    res.status(500).send(err);
  }
});

  

// DELETE a pet
router.delete("/:id",petMustExist, async (req, res) => {
  const {id } = req.params;
  try {
    await db(`DELETE FROM petlist WHERE id = ${id};`);
    const results = await db("SELECT * FROM petlist");
    res.send(results.data);
  } catch (err) {
    res.status(500).send(err);
  }
  //
});





module.exports = router;
