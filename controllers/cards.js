const knex = require("../db/knex.js");

module.exports = {
  // CHANGE ME TO AN ACTUAL FUNCTION
  index: function(req, res) {
    if(!req.session.list) {
      req.session.list =[];
    }

    knex('card')
      .then(cards => {
        res.render('index', {cards: cards, list: req.session.list});
      });
  },

  create: (req, res) => {
    knex('card')
      .insert({
        mana: req.body.mana,
        attack: req.body.attack,
        health: req.body.health,
        description: req.body.description
      })
    .then(() => res.redirect('/'));
  },

  listAdd: (req, res) => {
    knex('card')
      .where('id', req.params.card_id)
    .then(card => req.session.list.push(card[0]));
    req.session.save(() =>
      res.redirect('/'));
  },

  listRemove: (req, res) => {
    for (let i = 0; i < req.session.list.length; i++) {
      if (req.session.list[i].id == req.params.card_id) {
        req.session.list.splice(i, 1);
        break;
      }
    }
    req.session.save(() => res.redirect('/'));
  },
};
