const mongoose = require("mongoose");

const url =
  "mongodb+srv://foodhere:herefood@cluster0.nqi51dy.mongodb.net/foodhere_mern?retryWrites=true&w=majority";

const database = "foodhere_mern";

const connecttomongo = async () => {
  mongoose.set("strictQuery", false);
  const resultconn = await mongoose
    .connect(url)
    .then(() => {
      console.log("Connected Successfully");
    })
    .catch((err) => console.log(err));

  const collection = mongoose.connection.db.collection("fooditem");
  const resfood = await collection.find({}).toArray();

  const foodCategory = await mongoose.connection.db.collection("foodCategory");
  const resCate = await foodCategory.find({}).toArray();
  console.log(resCate);
  console.log(resfood);

  global.fooditems = resfood
  global.foodCategory = resCate






  // if(!response){
  //   console.error(error);
  // }else{
  //   // console.log(response);
  //   global.fooditems=response;
  //  // console.log(global.fooditems)
  // }
};

module.exports = connecttomongo;
