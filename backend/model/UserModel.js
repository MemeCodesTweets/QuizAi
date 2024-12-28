import mongoose, {Schema} from "mongoose";

const userSchema = new Schema(
    {
        user: {
            type: String,
            required: true,
            unique: true,
        }
    }
)

export const User = mongoose.model("User", userSchema)
