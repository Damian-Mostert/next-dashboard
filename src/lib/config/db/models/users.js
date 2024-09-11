import mongoose from "mongoose";

// Define the schema for the "users" collection
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate: {
            validator: function (v) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
            },
            message: (props) => `${props.value} is not a valid email!`
        },
    },
    password: {
        type: String,
        required: true
    },
    crud: {
        create: { type: Boolean, default: false },
        read: { type: Boolean, default: false },
        update: { type: Boolean, default: false },
        delete: { type: Boolean, default: false },
    },
}, {
    timestamps: true,
});

// Create a model using the schema
const USERS = mongoose.models.users || mongoose.model("users", userSchema);

export default USERS;
