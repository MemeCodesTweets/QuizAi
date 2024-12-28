import express from "express"

import { registerUser, showAlluser } from "../controller/User.js"

const router = express.Router();

router.route("/register").post(registerUser)
router.route("/showUser").get(showAlluser)

export default router
