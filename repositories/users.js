const { User } = require('../models')
module.exports = {
    getAllUsers() {
    return User.findAll()
    },
    // méthodes à implémenter
    getUsers(offset = 10, limit = 12) {return User.findAll({offset : offset,limit : limit}) },
    getAdmins() {return User.findAll({
        where:{
            role:"admin",
        }
    }) },
    getAuthors() {return User.findAll({
        where:{
            role:"author",
        }
    })  },
    getGuests(){return User.findAll({
        where:{
            role:"guest",
        }
    })  },
    getUser(id){return User.findOne({
        where:{
            id:id,
        }
    })  },
    getUserByName(username){return User.findOne({
        where:{
            username:username,
        }
    })  },
    getUserByEmail(email) { },
    addUser(user) {
        return User.create(user);
        /*
        return User.create({
          username: user.username,
          email: user.email,
          password: user.password,
          role: user.role,
        });*/
      },
    updateUser(id,user) { return User.update(user,{where : {id : id}}) },
    deleteUser(id) { return User.destroy({where : { id : id }})},
    // D'autres méthodes jugées utiles
    }
    