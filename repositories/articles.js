const { Article } = require('../models')
module.exports = {
    getAllArticles() {
    //return Article.findAll({where: { published : true }})
    return Article.findAll()
    },
    // méthodes à implémenter
    getArticles(offset = 10, limit = 12) {return Article.findAll({offset : offset,limit : limit}) },
    getAllArticlesByUser(id) {return Article.findAll({
        where:{
            UserId: id
        }
    }) },
    
    getArticle(id){return Article.findOne({
        where:{
            id:id,
        }
    })  },
    addArticle(article) {
        return Article.create(article);
      },
    updateArticle(id,article) { return Article.update(article,{where : {id : id}}) },
    deleteArticle(id) { return Article.destroy({where : { id : id }})},
    }
    