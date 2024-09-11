import mongoose from "mongoose";

// Define the schema for the "apis" collection
const apiSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    path: {
        type: String,
        required: true,
        unique:true,
    },
    handle: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

// Create a model using the schema
const API =mongoose.models.API ||  mongoose.model("API", apiSchema);

export default API;
