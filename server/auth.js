const mongoose = require("mongoose");
const schemas = require('./dbSchemas');
const environment = require('./environment');


function signIn(req, res) {
  mongoose.connect(environment.dbUrl, { useNewUrlParser: true,  useUnifiedTopology: true });

  const Users = mongoose.model("Users", schemas.userSchema);

    Users.findOne({email: req.body.email, password: req.body.password}).exec()
      .then(user => {
        if (!user) {
          res.status(401).send('Wrong email or password!');
        }
        else {
          res.send({account: user, orders: []})
        }
      })
      .catch(() => {
        res.status(500).send('Server error! Sorry!');
      })
      .finally(() => {
        mongoose.disconnect();
      })
}



function signUp(req, res) {

  mongoose.connect(environment.dbUrl, { useNewUrlParser: true,  useUnifiedTopology: true });

  const Users = mongoose.model("Users", schemas.userSchema);

  Users.findOne({email: req.body.email}).exec()
    .then(user => {
      if (user) {
        mongoose.disconnect();
        res.status(403).send('This email is already in use!');
      }
      else {
        const user = new Users ({
          email: req.body.email,
          password: req.body.password,
          name: req.body.name,
          surname: req.body.surname
        });


        user.save((err) => {
          mongoose.disconnect();

          if (err) {
            res.status(500).send('Server error! Sorry!');
          }
          else {
            res.send({
              account: {user, password: '****'},
              orders: []
            });
          }
        })
      }
    })
    .catch(() => {
      res.status(500).send('Server error! Sorry!');
      mongoose.disconnect();
    })
}

module.exports = {
  signIn: signIn,
  signUp: signUp
}
