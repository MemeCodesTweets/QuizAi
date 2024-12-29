import { User } from "../model/UserModel.js";

const registerUser = async (req, res) => {
    try {
        const { user } = req.body


        if (!user) {
            return res.status(403).json({
                success: false,
                message: "Enter Username",
            })
        }

        const existingUser = await User.findOne({ user })
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists"
            })
        }

        await User.create({
            user
        })

        return res.status(200).json({
            success: true,
            message: "User created",
        })


    } catch (error) {
        console.log(error)
        return res.status(401).json({
            success: false,
            message: "Error occured during username entry. Try Again"
        })
    }
}

const showAlluser = async (req, res) => {
    try {
        const alluser = await User.find()

        if (!alluser)
            return res.status(401).json({
                success: false,
                message: "No user found",
            })

        return res.status(200).json({
            success: true,
            message: "users found and displayed successfully",
            data: alluser
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "Cannot fetch user data while getting all users.",
            error: error.message
        })
    }
}

const submitScore = async (req, res) => {
    try {
        const correctAnswers = ["All of the above", "All of the above", "The JSX in React.js makes code easy to read and write.", "npx create-react-app my-app", "Virtual DOM", "3000", "1", "Using the Array.map() method", "Internal storage of the component.", "State & Props"];
        const { userAns } = req.body;
    
        if (!userAns || !Array.isArray(userAns)) {
            return res.status(400).json({ error: 'Invalid answers submitted.' });
        }
    
        // Calculate the score
        let score = 0;
        userAns.forEach((answer, index) => {
            if (answer === correctAnswers[index]) {
                score += 5; // Assuming 5 points for each correct answer
            }
        });
    
        res.json({ score });
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "Cannot fetch user data while getting all users.",
            error: error.message
        })
    }
}

export {
    showAlluser,
    registerUser,
    submitScore
}