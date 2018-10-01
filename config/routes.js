//Update the name of the controller below and rename the file.
const cards = require("../controllers/cards.js");

module.exports = function(app){

  app.get('/', cards.index);

  app.post('/cards', cards.create);

  app.get('/list/add/:card_id', cards.listAdd);

  app.get('/list/remove/:card_id', cards.listRemove);

};
