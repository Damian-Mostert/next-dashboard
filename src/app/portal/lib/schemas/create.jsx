"use client";

import Views from "./create/index";
import schemas from "../../../../lib/config/schemas";

export default function Create({params}){
    var type = schemas.create[params.main]?.[params.model]?.type;
    const Component = Views[type];
    return <Component params={params}/>
}