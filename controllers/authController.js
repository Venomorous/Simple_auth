const Role = require("../models/Role");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const { secret } = require("../config/auth.config.js");

const generateAccessToken = (id, roles) => {
    const payload = {
        id,
        roles,
    };
    return jwt.sign(payload, secret, { expiresIn: "24h" });
};

class authController {
    async register(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res
                    .status(400)
                    .json({ message: "Registration error", errors });
            }
            const { username, password } = req.body;
            const candidate = await User.findOne({ username });
            if (candidate) {
                return res.status(400).json({
                    message: `User with username ${username} already exists`,
                });
            }
            const hashPassword = bcrypt.hashSync(password, 7);
            const userRole = await Role.findOne({ value: "USER" });
            const user = new User({
                username,
                password: hashPassword,
                roles: [userRole.value],
            });
            await user.save();
            return res.json({ message: "User was succesfully registered" });
        } catch (err) {
            console.log(err);
            res.status(400).json({ message: "Registration error" });
        }
    }
    async login(req, res) {
        try {
            const { username, password } = req.body;
            const user = await User.findOne({ username });
            if (!user) {
                return res.status(400).json({
                    message: `User with username ${username} not found`,
                });
            }
            const validPassword = bcrypt.compareSync(password, user.password);
            if (!validPassword) {
                return res.status(400).json({ message: "Invalid password" });
            }
            const token = generateAccessToken(user._id, user.roles);
            return res.json({ token });
            // return res.json({ message: "User was succesfully logged in" });
        } catch (err) {
            console.log(err);
            res.status(400).json({ message: "Login error" });
        }
    }
    async getUsers(req, res) {
        try {
            const users = await User.find();
            res.json(users);
        } catch (err) {
            console.log(err);
            res.status(400).json({ message: "Get users error" });
        }
    }
}

module.exports = new authController();
