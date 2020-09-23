const environment = require('./environment');
const nodemailer = require('nodemailer');
const mongoose = require("mongoose");
const schemas = require('./dbSchemas');

module.exports = {
    addOrder(req, res) {
        mongoose.connect(environment.dbUrl, { useNewUrlParser: true,  useUnifiedTopology: true });

        const Orders = mongoose.model("Orders", schemas.ordersSchema);

        const order = new Orders({
            userId: req.body.userId,
            email: req.body.userInfo.email || '',
            total: req.body.total,
            address: req.body.userInfo.address,
            order: [...req.body.order]
        })

        order.save((err) => {
            mongoose.disconnect();
            if (err) {
                res.status(500).send('Server error! Sorry!');
            }
            else {
                if (req.body.userInfo.sendEmailResponse) {
                    let smtpTransport;
                    try {
                        smtpTransport = nodemailer.createTransport({...environment.emailData});
                    } catch (err) {
                        res.send('Sorry! We have some problems in our server');
                    }

                    let mailOptions = {
                        from: environment.emailData.auth.user,
                        to: req.body.userInfo.email,
                        subject: 'NewPizza order',
                        text: 'NewPizza order',
                        html: "Your order was <b>successfully</b> delivered"
                    };

                    smtpTransport.sendMail(mailOptions, (error) => {
                        if (error) {
                            res.send('Sorry! We have some problems in our server')
                        } else {
                            res.send('Your order has been processed! Check your email!')
                        }
                    })
                }
                res.send('Your order has been processed!');
            }
        })
    },
    getUserOrders(req, res) {
        mongoose.connect(environment.dbUrl, { useNewUrlParser: true,  useUnifiedTopology: true });

        const Orders = mongoose.model("Orders", schemas.ordersSchema);
        Orders.find({$or:[{userId: req.body.id}, {email: req.body.email}]}).exec()
            .then(orders => {
                res.send(orders);
            })
            .catch(() => {
                res.send([]);
            })
            .finally(() => {
                mongoose.disconnect();
            })
    }
}