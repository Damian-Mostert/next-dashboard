import mongoose from "mongoose";

// Define the schema for the "workspaces" collection
const logSchema = new mongoose.Schema({
    // Define fields with their types and any other options you need
    action: {
        type: String,
        required: true,
    },   
    model: {
        type: String,
        required: true,
    },
    content: Object,
    createdAt: {
        type: Date,
        default: Date.now,
    },
});



// Create a model using the schema
const Log = mongoose.models.Log || mongoose.model("Log", logSchema);

// Remove incomplete or incorrect lines
// Example: Log.find() - if you need to find logs, do it correctly in your application logic

export default Log;
