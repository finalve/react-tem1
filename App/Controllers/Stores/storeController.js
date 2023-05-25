const db = require("../../Models");
const Promotions = db.promotions
const Purchase = db.purchase;
const Stores = db.stores;
const Products = db.products;
const moment = require('moment');
exports.Stores = (req, res) => {
    Stores.find({}, (err, stores) => {
        if (err)
            return res.status(500).json({ error: 'Internal Server Error' });


        res.json(stores);
    })
}


exports.Shop = async (req, res) => {
    const response = async () => {
        return new Promise((resolve, reject) => {
            Stores.find({}, async (err, stores) => {
                if (err) {
                    reject(res.status(500).json({ error: 'Internal Server Error' }));
                }

                let data = [];

                for (let store of stores) {
                    if (store.sold)
                        continue;

                    try {
                        const product = await Products.findOne({ _id: store.product }).exec();
                        const promotions = await Promotions.findOne({ product: store.product }).exec();

                        const calcurate = Math.ceil((store.expiry - store.createAt) / 1000 / 60 / 60 / 24);
                        let expiry = 30;
                        let price = product.price;
                        if (expiry == 0)
                            continue;
                        const sorted = promotions.promotion.sort((a, b) => parseInt(b.remainingdays) - parseInt(a.remainingdays))

                        sorted.map(promo => {
                           
                            if (calcurate >= expiry)
                            return;
                         
                            if (calcurate >= promo.remainingdays) {
                              
                                expiry = promo.remainingdays
                                price = promo.price
                            }
                        })
                        const myData = {
                            orderId: store._id,
                            expiry: expiry,
                            name: product.name,
                            price: price,
                            type: product.type,
                            img: product.img,
                            description: product.description
                        };

                        data.push(myData);
                    } catch (err) {
                        reject(res.status(500).json({ error: 'Internal Server Error' }));
                    }
                }

                resolve(data);
            });
        });
    };

    response()
        .then((data) => res.json(data))
        .catch((err) => console.error(err.response));
};

exports.CreateStore = (req, res) => {
    const { product, email, password, options, createAt, expiry } = req.body;

    const newStore = new Stores({
        email: email,
        password: password,
        options: options,
        createAt: createAt,
        expiry: expiry
    });

    Products.findOne({ name: product }, (err, product) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        if (!product)
            return res.status(400).json({ error: 'Product not Found' });
        newStore.product = [product._id];
        newStore.save((err) => {
            if (err)
                return res.status(500).json({ error: err });

            res.status(200).json({
                product: newStore.name,
                message: `Create Store successfuly`
            });
        });
    });
};
exports.PurchaseItem = (req, res) => {
    const { orderId } = req.body;
    const userId = req.userId;
    
    if (typeof orderId !== 'string' || !orderId.match(/^[0-9a-fA-F]{24}$/)) {
        return res.status(400).json({ error: 'Invalid Order ID!' });
    }
    Purchase.findOne({ orderid: orderId }, (err, order) => {
        if (err)
            return res.status(500).json({ error: 'Internal Server Error' });
        if (order)
            return res.status(400).json({ error: 'Order Sold Alreadry!' });

        Stores.findById(orderId, (err, store) => {
            if (err)
                return res.status(500).json({ error: 'Internal Server Error' });
            if (!store)
                return res.status(400).json({ error: 'Invalid OrderId !' });
            store.sold = true;
            const calcurate = Math.ceil((store.expiry - store.createAt) / 1000 / 60 / 60 / 24);
            let expiry = 30;

            Products.findById(store.product, (err, product) => {
                if (err)
                    return res.status(500).json({ error: 'Internal Server Error' });
                let price = product.price;
                if (calcurate < 30) {
                    expiry = 7;
                } else if (calcurate < 7) {
                    expiry = 1;
                } else if (calcurate < 1) {
                    return res.status(400).json({ error: 'Order Expired !' });
                }

                Promotions.findOne({ product: store.product }, (err, promos) => {
                    if (err)
                        return res.status(500).json({ error: 'Internal Server Error' });
                    promos.promotion.map(promo => {
                        if (expiry <= promo.remainingdays)
                            price = promo.price
                    })
                })
                const newItem = new Purchase({
                    orderid: orderId,
                    userid: userId,
                    price: price,
                    product: product.name,
                    createAt: moment(),
                    expiry: moment().add(expiry, 'days')
                });
                try {
                    // ส่วนนี้ ยังขาดการหัก Point 

                    newItem.save();
                    store.save();
                    res.status(200).json({
                        message: `Purchase successfuly`
                    });
                }
                catch (err) {
                    return res.status(500).json({ error: err });
                }
            })

        })

    })
}
