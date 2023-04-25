const db = require("../../Models");
const Promotions = db.promotions
const Purchase = db.purchase;
const Stores = db.stores;
const Products = db.products;
const Users = db.user;
exports.UserData = async (req, res) => {
    const response = async () => {
        return new Promise((resolve, reject) => {
            Purchase.find({}, async (err, purchase) => {
                if (err)
                    return res.status(500).json({ error: 'Internal Server Error' });
                    const items = [];
                    for (let item of purchase) {
                    try {
                        const store = await Stores.findOne({ _id: item.orderid }).exec();
                        const user = await Users.findOne({ _id: item.userid }).exec();
                        const calcurate = Math.ceil((item.expiry - item.createAt) / 1000 / 60 / 60 / 24);
                        let newItem = {
                            product: item.product,
                            orderid: item.orderid,
                            remainingdays: calcurate,
                            options: store.options,
                            user: user.username,
                            store: { email: store.email, password: store.password }
                        }

                        items.push(newItem)
                    } catch (err) {
                        reject(res.status(500).json({ error: 'Internal Server Error' }));
                    }
                }
                resolve(items);
            })
        })
    }
    response()
    .then((data) => res.json(data))
    .catch((err) => console.error(err));
}
