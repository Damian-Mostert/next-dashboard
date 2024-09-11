"use client";


import { useSearchParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react";
import Container from "@portal/lib/components/global/container";
import TopBar from "@portal/lib/components/global/bars/top";
import getButtons from "@portal/lib/js/get-buttons";
import Button from "@portal/lib/components/global/button";

export default function OtherUsers({params,buttons_config}){

    const router = useRouter();
    const buttons = getButtons();
    const search = useSearchParams();
    const [filter,setFilter] = useState(false);
    
    useEffect(()=>{
        if(search.get("filter")){
            const keys = {};
            search.forEach((value,key)=>{
                keys[key] = value
            })
            setFilter(keys)
        }else{
            setFilter(null);
        }
    },[search]);

    return <Container type="scrollable" bar={<TopBar title={filter ? "Filtered" : "All"} buttons={[
       ...((filter) ?  [buttons.defilter] : [])
    ]}/>}>
   
    </Container>
}