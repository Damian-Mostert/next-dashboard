const parseModelKeys = (model) => {
    const createDefaultValue = (field) => {
        // Determine the default value based on type and schema definition
        if (field.default !== undefined) {
            return field.default;
        }

        // Handle different Mongoose types
        switch (field.type) {
            case String:
                return "";
            case Number:
                return 0;
            case Boolean:
                return false;
            case Date:
                return { "$date": new Date().toISOString() };
            case Array:
                // If field is an array, check if it contains objects or primitives
                return Array.isArray(field) ? [] : [];
            case Object:
            case 'Mixed': 
                // Recursively parse nested objects
                return {};
            default:
                return ''; // Default for unrecognized types
        }
    };

    const parseField = (field) => {
        // Handle fields with type directly defined
        if (field.type) {
            return createDefaultValue(field);
        }

        // Handle arrays with specified types
        if (Array.isArray(field)) {
            if (field.length && typeof field[0] === 'function') {
                return [];
            } else if (field.length && typeof field[0] === 'object') {
                return field[0].type ? [createDefaultValue(field[0])] : [];
            }
            return [];
        }

        // Handle nested objects by recursion
        if (typeof field === 'object' && !Array.isArray(field)) {
            let nestedObj = {};
            for (const [nestedKey, nestedField] of Object.entries(field)) {
                nestedObj[nestedKey] = parseField(nestedField);
            }
            return nestedObj;
        }

        return ''; // For unexpected structures
    };

    const parsedKeys = {};

    // Iterate through each schema field and parse it
    for (const [key, value] of Object.entries(model).filter(([key,value])=>{
        return key!="_id"  && key!="__v" && key!="id"&& key!="updatedAt"&&key!="createdAt"
    })) {
        parsedKeys[key] = parseField(value);
    }

    return parsedKeys;
};


export default parseModelKeys;