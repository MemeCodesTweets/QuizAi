import express from "express"

import { registerUser, showAlluser, submitScore } from "../controller/User.js"

const router = express.Router();

router.route("/register").post(registerUser)
router.route("/showUser").get(showAlluser)
router.route("/submit").post(submitScore)

export default router
