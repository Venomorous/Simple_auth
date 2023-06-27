const Router = require("express");
const router = new Router();

const authController = require("../controllers/authController.js");
const { check } = require("express-validator");
const authMiddleware = require("../middlewares/authMiddleware.js");
const roleMiddleware = require("../middlewares/roleMiddleware.js");

router.post(
    "/registration",
    [
        check("username", "Username cannot be empty").notEmpty(),
        check("password", "Password cannot be empty").notEmpty(),
        check(
            "password",
            "Password should be longer than 4 and shorter than 10 characters"
        ).isLength({ min: 4, max: 10 }),
    ],
    authController.register
);
router.post("/login", authController.login);
router.get("/users", roleMiddleware(["ADMIN"]), authController.getUsers);

module.exports = router;
