import mongoose from "mongoose";
const Schema = mongoose.Schema;

// Define the user schema
const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        image: {
            type: String,
            default: "",
        },
        id: {
            type: String,
            required: true,
            unique: true,
        },
        dob: {
            type: Date,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/.+\@.+\..+/, "Please enter a valid email address"],
        },
    },
    {
        timestamps: true,
    }
);
const planSchema = new Schema(
    {
        place: {
            type: String,
            require: true,
        },
        image: {
            type: String,
            default: "",
        },
        country: {
            type: String,
            require: true,
        },
        placeId: {
            type: String,
            require: true,
            unique: true,
        },
        days: {
            type: Number,
            require: true,
        },
        price: {
            type: String,
            require: true,
        }

    }
)
// Compile the schema into a model
const User = mongoose.model("User", userSchema);
const Plan = mongoose.model("Plan", planSchema);
export { User, Plan };