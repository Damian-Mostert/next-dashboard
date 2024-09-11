export function camelToReadable(camelCaseString) {
    if(camelCaseString == "_id")return "Id";
    if(camelCaseString == "__v")return "Version";

    // Insert a space before each uppercase letter (except the first one)
    const spacedString = camelCaseString
        .replace(/([a-z])([A-Z])/g, '$1 $2');
    
    // Capitalize the first letter and make the rest lowercase
    return spacedString.charAt(0).toUpperCase() + spacedString.slice(1).toLowerCase();
}