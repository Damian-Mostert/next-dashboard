import "./init";

import apis from "./models/apis"
import pages from "./models/pages"
import workspaces from "./models/workspaces"
import log from "./models/log";
import users from "./models/users"

export default {
    models:{
        users,
        log,
        apis,
        pages,
        workspaces
    }   
}