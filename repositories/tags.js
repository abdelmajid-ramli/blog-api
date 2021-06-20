const { Tag } = require('../models')
module.exports = {
    getAllTags() {
    return Tag.findAll()
    },
    getTag(id){return Tag.findAll({
        where:{
            id:id,
        }
    })  },
    getTagsByArticle(id){return Tag.findAll({
        where:{
            ArticleId:id,
        }
    })  },
    addTag(tag) {
        return Tag.create(tag);
      },
    updateTag(id,tag) { return Tag.update(tag,{where : {id : id}}) },
    deleteTag(id) { return Tag.destroy({where : { id : id }})},
    }
    