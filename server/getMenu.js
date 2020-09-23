const mongoose = require("mongoose");
const schemas = require('./dbSchemas');
const environment = require('./environment');


module.exports = {
  getMenu(res) {
    mongoose.connect(environment.dbUrl, { useNewUrlParser: true,  useUnifiedTopology: true });
    const Menu = mongoose.model('Menu', schemas.menuSchema);

    Menu.find({}).exec()
      .then(menu => {
          res.send(menu);
        })
        .catch(err => {
          res.send(err);
        })
        .finally(() => {
          mongoose.disconnect();
        })
  }
}
