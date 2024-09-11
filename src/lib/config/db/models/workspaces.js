import mongoose from "mongoose";

// Define the schema for the "workspaces" collection
const workspaceSchema = new mongoose.Schema({
    // Define fields with their types and any other options you need
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
    // Add more fields as required
});

// Create a model using the schema
const Workspace = mongoose.models.Workspace || mongoose.model("Workspace", workspaceSchema);

export default Workspace;
