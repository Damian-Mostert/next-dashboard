"use client";

import Views from "./views";
import schemas from "@lib/config/schemas";

export default function View({params}){
    var type = schemas.view[params.main]?.[params.model]?.type;
    var buttons_config = schemas.view[params.main]?.[params.model]?.buttons_config;
    if(!type) type = "list"
    if(!buttons_config) buttons_config = {
        update:true,
        delete:true,
        details:true
    };
    const Component = Views[type];
    return <Component params={params} buttons_config={buttons_config}/>
}