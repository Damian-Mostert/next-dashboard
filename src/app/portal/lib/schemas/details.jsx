"use client";

import Views from "./details/index";
import schemas from "@lib/config/schemas";

export default function Details({params}){
    var type = schemas.details[params.main]?.[params.model]?.type;
    const Component = Views[type];
    return <Component params={params}/>
}