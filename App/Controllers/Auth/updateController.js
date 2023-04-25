const db = require("../../Models");
const jwt = require('jsonwebtoken');
var bcrypt = require("bcryptjs");
const User = db.user;
const update = (req, res) => {

	const { password, newpassword } = req.body;
	const  id = req.userId;
	User.findById(id, (err, user) => {
		if (err) {
			return res.status(500).json({ error: 'Internal Server Error' });
		}
		let pwd = password;
		const isMatch = bcrypt.compare(pwd.toString(), user.password);

		if (!isMatch) {
			return res.status(400).json({ error: 'Invalid password' });
		}
		bcrypt.genSalt(10, (err, salt) => {
			if (err) 
			return res.status(500).json({ error: 'Internal Server Error' });
			bcrypt.hash(newpassword, salt, (err, hashedPassword) => {
				if (err) 
					return res.status(500).json({ error: 'Internal Server Error' });
				user.password = hashedPassword;
				user.save(err => {
					if (err)
						return res.status(500).json({ error: err });

					res.status(200).json({
						username: user.username,
						message: `${user.username} Update successfuly`
					});
				});
			});
		});
	});
};

module.exports = update;