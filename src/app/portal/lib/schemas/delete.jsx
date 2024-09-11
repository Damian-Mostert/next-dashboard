"use client";

import Views from "./delete/index";
import schemas from "@lib/config/schemas";

export default function Delete({params}){
    var type = schemas.delete[params.main]?.[params.model]?.type;
    const Component = Views[type];
    return <Component params={params}/>
}