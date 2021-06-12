const { Comment } = require('../models')
module.exports = {
    getAllComments() {
    return Comment.findAll()
    },
    getComment(id){return Comment.findAll({
        where:{
            id:id,
        }
    })  },
    getCommentsByArticle(id){return Comment.findAll({
        where:{
            ArticleId:id,
        }
    })  },
    addComment(comment) {
        return Comment.create(comment);
      },
    updateComment(id,comment) { return Comment.update(comment,{where : {id : id}}) },
    deleteComment(id) { return Comment.destroy({where : { id : id }})},
    }
    