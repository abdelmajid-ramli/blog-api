const router = require("express").Router();
const usersRepo = require("../repositories/users");

/* GET users listing. */
router.get("/", async function (req, res, next) {
  if (req.query.role === "admin") {
    res.send(await usersRepo.getAdmins());
  }
  if (req.query.role === "author") {
    res.send(await usersRepo.getAuthors());
  }
  if (req.query.role === "guest") {
    res.send(await usersRepo.getGuests());
  }
  if (req.query.name) {
    console.log("username");
    console.log(req.query.name);
    res.send(await usersRepo.getUserByName(req.query.name));
    console.log("username2");
  }
  if (req.query.offset || req.query.limit) {
    let offset = Number(req.query.offset);
    let limit = Number(req.query.limit);
    res.send(await usersRepo.getUsers(offset,limit));
  }else{
    res.send(await usersRepo.getAllUsers());
  }
});



router.get("/:id", async function (req, res, next) {
  res.send(await usersRepo.getUser(req.params.id));
});


router.put("/:id", async function (req, res, next) {
  res.send(await usersRepo.updateUser(req.params.id,req.body));
  
 });
router.post("/", async function (req, res, next) {
 res.json(await usersRepo.addUser(req.body));
 
});


router.delete("/:id", async function (req, res, next) {
  if(await usersRepo.deleteUser(req.params.id)){
    res.send("user deleted");
  }else{
    res.send("error while deleting user");
  }
});
module.exports = router;