const express = require("express");
const router = express.Router();

router.post("/foodData", (req, res) => {
  try {
    res.send([global.fooditems,global.foodCategory]);
  //  console.log(global.fooditems);
  } catch (error) {
   // console.error(error.message);
    res.send("server Error");
  }
});

module.exports = router;
