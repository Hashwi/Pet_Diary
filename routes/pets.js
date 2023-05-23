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
router.get("/:id", petMustExist, function(req, res, next){

  db("SELECT * FROM petlist;")
    .then(results => {
      res.send(results.data);
    })
    .catch(err => res.status(500).send(err));
});


//INSERT a new pet

router.post("/", async function(req,res,next){
  console.log('this works')
  const {name, age, notes, medicine, vaccination} = req.body;
  try{
    await db(
    `INSERT INTO petlist (name, age, notes, medicine,vaccination) VALUES("${name}","${age}","${notes}","${medicine}","${vaccination}")`
    );
    res.send({message:'Pet was Added'})

  } catch(err){
    console.log(err)
    res.status(500).send(err);

  }
})

// EDIT/ UPDATE a pet
// router.put('/api/:id', async(req,res,next)=>{
//   const {id} =req.params;
//   try {
//     await db(`UPDATE petlist SET complete = !complete WHERE id = ${id};`);
//     // If the query is successfull you should send back the full list of items
//     const results = await db("SELECT * FROM petlist");
//     res.send(results.data);
//   } catch (err) {
//     res.status(500).send(err);
//   }

//})


module.exports = router;
