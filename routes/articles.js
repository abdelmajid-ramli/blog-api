const router = require("express").Router();
const articlesRepo = require("../repositories/articles");
const commentsRepo = require('../repositories/comments');
const usersRepo = require('../repositories/users');

/* GET articles listing. */
router.get("/", async function (req, res, next) {
  if (req.query.offset || req.query.limit) {
    let offset = Number(req.query.offset);
    let limit = Number(req.query.limit);
    res.send(await articlesRepo.getArticles(offset,limit));
  }else{
    res.send(await articlesRepo.getAllArticles());
  }
});



/*router.get("/:id", async function (req, res, next) {
  const article = await articlesRepo.getArticle(req.params.id)
  //const article = await articlesRepo.getArticle(req.params.id);
  console.log(article.id);
  //res.send(article)
  //res.send( {article : await articlesRepo.getArticle(req.params.id), comments : await commentsRepo.getCommentsByArticle(req.params.id), user : await usersRepo.getUser(idd.UserId)})
  //res.send(await articlesRepo.getArticle(req.params.id));
});*/

router.get('/:id', async function(req, res, next) {
  const idd = await articlesRepo.getArticle(req.params.id);
  res.send( {article : await articlesRepo.getArticle(req.params.id), comments : await commentsRepo.getCommentsByArticle(req.params.id), user : await usersRepo.getUser(idd.UserId)})
});


router.put("/:id", async function (req, res, next) {
  res.send(await articlesRepo.updateArticle(req.params.id,req.body));
  
 });
router.post("/", async function (req, res, next) {
 res.json(await articlesRepo.addArticle(req.body));
 
});


router.delete("/:id", async function (req, res, next) {
  if(await articlesRepo.deleteArticle(req.params.id)){
    res.send("article deleted");
  }else{
    res.send("error while deleting article");
  }
});
module.exports = router;