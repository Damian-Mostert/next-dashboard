"use client";

import { useRouter } from "next/navigation";
import Button from "@portal/lib/components/global/button";
import { useEffect, useState } from "react";
import callApi from "@portal/lib/js/call-api";
import Loader from "@portal/lib/components/global/loader";
import TableMap from "../../../schemas/components/table-map";
import parseModelKeys from "../../../js/parse-model-keys";

export default function Filter({params}){
    const router = useRouter();
    const [keys,setKeys] = useState([]);
    const filter = () =>{
        let filterQ = "?filter=true";
        Object.keys(keys).map(key=>filterQ+=`&${key}=true`)
        router.push(`${filterQ}`)
    }
    const load = async () =>{
        const res = await callApi({...params,action:"get-model-keys"});
       setKeys(res);
    }
    useEffect(()=>{
        load();
    },[]);

    const values = parseModelKeys(keys);

    return <div className="w-[80vw] h-[80vh] flex flex-col">
        <div className="px-4">
        <Button variant="act" text="Search" onClick={filter}/>
        </div>
        <div className="flex w-full h-full overflow-auto">
        <TableMap {...{data:values,schema:values}}/>
        {keys.length == 0 && <Loader text={"Loading model keys..."} subtext={"Please wait..."}/>}
        </div>
    </div>
}

