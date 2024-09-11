import { camelToReadable } from "@portal/lib/js/camel-to-readable";
import db from "./db/list.json";


const mains = {
    content:{
        text:"Content",
        link:"/content"
    },
    logs:{
        text:"History",
        link:"/logs"
    },
    user:{
        text:"User",
        link:"/user"
    }
}

const models_slugs = {};
db.filter(u=>u!="log"&&u!="workspaces"&&u!="users").map(key=>models_slugs[key] = {
	"title":camelToReadable(key),
	"forbidden":["user"],
	"buttons":{
		"content":{
			"index":["create","filter"],
			"view":["create","filter"],
			"create":["back"],
			"update":["back"],
			"delete":["back"],
			"details":["back","update","delete"]
		},
		"logs":{
			"index":["filter"],
			"details":["back"]

		}
	}
})
db.filter(u=>u=="users").map(key=>models_slugs[key] = {
	"title":camelToReadable(key),
	"forbidden":["user","content"],
	"buttons":{
		"content":{
			"index":["create","filter"],
			"view":["create","filter"],
			"create":["back"],
			"update":["back"],
			"delete":["back"],
			"details":["back","update","delete"]
		},
		"logs":{
			"index":["filter"],
			"details":["back"]

		}
	}
})

const user_slugs = {};
['../details/all/{user_id}','all','logout'].map(key=>user_slugs[key]={
    "title":key == "../details/all/{user_id}" ? "Me": camelToReadable(key),
    "forbidden":["logs","content"],
    "buttons":{
        "all":{
            "index":["filter","create"],
			"all":["back","create"]
        }
    }
})


export default {
	mains,
	slugs:{
		...user_slugs,
	    ...models_slugs
	}
}
