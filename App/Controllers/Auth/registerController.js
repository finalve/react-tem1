const db = require("../../Models");
const jwt = require('jsonwebtoken');
var bcrypt = require("bcryptjs");
const User = db.user;
const Role = db.role;
const register = (req, res) => {
	const { username, password } = req.body;

	User.findOne({ username: { $eq: username }}, (err, user) => {
		if (err) {
			return res.status(500).json({ error: 'Internal Server Error' });
		}
		if (user) {
			return res.status(400).json({ error: 'Username already exists' });
		}
		bcrypt.genSalt(10, (err, salt) => {
			if (err) 
			return res.status(500).json({ error: 'Internal Server Error' });
			 bcrypt.hash(password, salt, (err, hashedPassword) => {
				if (err) 
					return res.status(500).json({ error: 'Internal Server Error' });
					const newUser = new User({
						username: username,
						password: hashedPassword
					});
					//$2a$08$kQOYdf5naFuXZbKZWn..LenNc4giMRMIc/t4Cn9pqWWcH363jlJNu
					Role.findOne({ name: "user" }, (err, role) => {
						if (err) {
							res.status(500).send({ error: err });
							return;
						}
			
						newUser.roles = [role._id];
						newUser.save((err) => {
							if (err) 
								return res.status(500).json({ error: err });
			
							res.status(200).json({
								username: newUser.username,
								message: `${newUser.username} Register successfuly`
							});
						});
					});
			});
		});
		

	});
};

module.exports = register;
