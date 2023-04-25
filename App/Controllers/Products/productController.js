const db = require("../../Models");
const Promotions = require("../../Models/promotion");
const Products = db.products;
exports.Products = (req, res) => {
    Products.find({}, (err, products) => {
        if (err)
            return res.status(500).json({ error: 'Internal Server Error' });

        let data = products.map(product => {
            return {
                name: product.name,
                price: product.price,
                type: product.type,
                img: product.img,
                description: product.description
            }
        })

        res.json(data);
    })
}
exports.UploadImage = (req, res) => {
    console.log(req.body)
    res.json({ message: 'upload succsess' });
}
exports.CreateProduct = (req, res) => {
    const { name, cost, price, type, description } = req.body;
    const img = req.file.filename;
    Products.findOne({ name: name }, (err, product) => {
        if (err) {
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        if (product) {
            return res.status(400).json({ error: 'Product already exists' });
        }

        const newProduct = new Products({
            name: name,
            cost: cost,
            price: price,
            type: type,
            img: img.split('.')[0],
            description: description
        });

        newProduct.save((err) => {
            if (err)
                return res.status(500).json({ error: err });

            res.status(200).json({
                product: newProduct.name,
                message: `Create Product successfuly`
            });
        });
    });
};

exports.CreatePromotion = (req, res) => {
    const { product, promotion } = req.body;


    const newPromotion = new Promotions({
        promotion: promotion
    });

    Products.findOne({ name: product }, (err, product) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        if (!product)
            return res.status(400).json({ error: 'Product not Found' });
        Promotions.findOne({ product: product._id }, (err, promos) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }
            if (promos)
                return res.status(400).json({ error: 'Product Add Promotion Already Exist!' });

            newPromotion.product = [product._id];
            newPromotion.save((err) => {
                if (err)
                    return res.status(500).json({ error: err });

                res.status(200).json({
                    message: `Create Promotion successfuly`
                });
            });
        });

    })

};