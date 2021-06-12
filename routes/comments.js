const router = require("express").Router();
const commentsRepo = require("../repositories/comments");


router.get("/", async function (req, res, next) {
    if(req.query.articleid){
        res.send(await commentsRepo.getCommentsByArticle(req.query.articleid));
    }
    res.send(await commentsRepo.getAllComments());
  }
);



router.get("/:id", async function (req, res, next) {
  res.send(await commentsRepo.getComment(req.params.id));
});


router.put("/:id", async function (req, res, next) {
  res.send(await commentsRepo.updateComment(req.params.id,req.body));
  
 });
router.post("/", async function (req, res, next) {
 res.json(await commentsRepo.addComment(req.body));
 
});


router.delete("/:id", async function (req, res, next) {
  if(await commentsRepo.deleteComment(req.params.id)){
    res.send("comment deleted");
  }else{
    res.send("error while deleting comment");
  }
});
module.exports = router;