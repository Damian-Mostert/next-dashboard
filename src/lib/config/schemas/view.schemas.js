export default {
    content:{},//uses defaults
    logs:{
        users:{
            type:"list",
            buttons_config:{
                details:true
            }
        },
        pages:{
            type:"list",
            buttons_config:{
                details:true
            }
        },

    },
    user:{
        logout:{
            type:"logout"
        },
        me:{
            type:"me"
        },
        all:{
            type:"list",
            buttons_config:{
                details:true
            }
        }
    }
}