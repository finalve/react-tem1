const db = require("../../Models");
const Types = db.types;
exports.Types = (req,res) => {
    Types.find({}, (err, types)=>{
        if(err)
        return res.status(500).json({ error: 'Internal Server Error' });
       
        let data = types.map(type => {return {
            name: type.name,
            description: type.description
        }})
        res.json(data);
    })
}
exports.CreateType = (req, res) => {
    const { name, description } = req.body;

    Types.findOne({ name: name }, (err, type) => {
        if (err) {
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        if (type) {
            return res.status(400).json({ error: 'Type already exists' });
        }

        const newType = new Types({
            name: name,
            description: description
        });

        newType.save((err) => {
            if (err)
                return res.status(500).json({ error: err });

            res.status(200).json({
                name: newType.name,
                message: `Create Type ${newType.name} successfuly`
            });
        });
    });
};
