"use client";

import Views from "./update/index";
import schemas from "@lib/config/schemas";

export default function Update({params}){
    var type = schemas.update[params.main]?.[params.model]?.type;
    const Component = Views[type];
    return <Component params={params}/>
}