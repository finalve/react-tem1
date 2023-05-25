const db = require("../../Models");
const jwt = require('jsonwebtoken');
var bcrypt = require("bcryptjs");
const config = require('../../../config')

const User = db.user;

const login = (req, res) => {
	const { username, password } = req.body;
	User.findOne({ username: { $eq: username }})
		.populate("roles", "-__v")
		.exec((err, user) => {
			if (err) {
				res.status(500).json({ error: err });
				return;
			}
			if (!user) {
				return res.status(400).json({ error: 'Username or Password Invalid!' });
			}
			let pwd = password;
			var passwordIsValid = bcrypt.compareSync(
				pwd.toString(),
				user.password
			);

			if (!passwordIsValid) {
				return res.status(401).json({ error: 'Username or Password Invalid!' });
			}
		
            const token = jwt.sign({userId: user._id}, config.secret, {});
            var authorities = [];
			for (let i = 0; i < user.roles.length; i++) {
				authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
			}
			
			res.status(200).json({
				id: user._id,
				username: user.username,
				roles: authorities,
				accessToken: token,
			});
		});
};

module.exports = login
