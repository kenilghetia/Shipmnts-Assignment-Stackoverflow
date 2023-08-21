const userDetails = require('../models/User.js');
const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports = {
    createUser: async (req, res) => {
        try {
            const { name, email, password, role } = req.body;

            const existingUser = await userDetails.findOne({ email });
            if (existingUser) {
                return res.status(409).send({ statuscode: sc.Conflict.code, message: sc.Conflict.message, data: 'user already exists with this email' });
            }

            bcrypt.genSalt(saltRounds, (err, salt) => {
                bcrypt.hash(password, salt, async (err, hash) => {
                    const x = await userDetails.create({ name, email, password: hash, role });
                    return res.status(200).send({ statuscode: sc.Created.code, message: sc.Created.message, data: x });
                });
            });

        } catch (error) {
            return res.status(500).send({ statuscode: sc.Internal_Server_Error.code, message: sc.Internal_Server_Error.message, data: error });
        }
    },

    loginUser: async (req, res) => {
        try {
            const { email, password } = req.body;

            const existingUser = await userDetails.findOne({ email });

            const id = existingUser._id.toString();
            const role = existingUser.role;

            if (!existingUser) {
                return res.status(409).send({ statuscode: sc.Conflict.code, message: sc.Conflict.message, data: 'user does not exists with this email' });
            } else {
                const compare = await bcrypt.compare(password, existingUser.password);

                if (!compare) {
                    return res.status(401).send({ statuscode: sc.Unauthorized.code, message: sc.Unauthorized.message, data: 'Incorrect password!' });
                } else {
                    const token = jwt.sign({ id, email, role }, key, { expiresIn: '10h' });
                    return res.status(200).send({ statuscode: sc.OK.code, message: 'Successfully logged in', data: token });
                }
            }

        } catch (error) {
            console.log(error);
            return res.status(500).send({ statuscode: sc.Internal_Server_Error.code, message: sc.Internal_Server_Error.message, data: error });
        }
    },
};