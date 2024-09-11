import mongoose from "mongoose";
// Define the schema for Pages, which includes Popups and Components
const pageSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
        default:"none"
    },
    url: {
        type: String,
        required: true,
        unique: true, // Ensures that each page has a unique URL
    },
    popups: {
        type:Array,
        default:[
            {
                name:"",
                props:[{key:"",value:""}]      
            }
        ]
    }, // Array of popups
    components: {
        type:Array,
        default:[
            {
                name:"",
                props:[{key:"",value:""}]      
            }
        ]
    }, // Array of components
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
const Page =mongoose.models.Page ||  mongoose.model("Page", pageSchema);

export default Page;
