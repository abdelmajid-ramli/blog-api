const router = require("express").Router();
const tagsRepo = require("../repositories/tags");


router.get("/", async function (req, res, next) {
    res.send(await tagsRepo.getAllTags());
  }
);



router.get("/:id", async function (req, res, next) {
  res.send(await tagsRepo.getTag(req.params.id));
});


router.put("/:id", async function (req, res, next) {
  res.send(await tagsRepo.updateTag(req.params.id,req.body));
  
 });
router.post("/", async function (req, res, next) {
 res.json(await tagsRepo.addTag(req.body));
 
});


router.delete("/:id", async function (req, res, next) {
  if(await tagsRepo.deleteTag(req.params.id)){
    res.send("tag deleted");
  }else{
    res.send("error while deleting tag");
  }
});
module.exports = router;