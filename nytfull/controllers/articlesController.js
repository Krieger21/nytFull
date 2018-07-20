const db = require("../models")

module.exports = {
    findAll: function(req, res) {
        db.Articles
            .findAll(req.query)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.statue(422).json(err))
    },
    create: function(req, res) {
        db.Articles
            .create(req.body)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err))
    },
    remove: function(req, res) {
        db.Articles
            .findById({_id: req.params.id})
            .then(dbModel => dbModel.remove())
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err))

    }
}