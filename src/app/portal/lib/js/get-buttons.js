"use client";

import { useParams } from "next/navigation";
import useUser from "@src/lib/js/use-user";

export default function GetButtons(){
    const params = useParams();
    const {user} = useUser();
    const buttons = {
        back:{
            variant:"act",
            text:"Back",
            link:`:back`
        },
        defilter:{
            variant:"delete",
            text:"Disable filters",
            link:`?no-query`
        },
    }
    if(user){
        if(user.crud.create)buttons.create = {
            variant:"update",
            text:"Create",
            link:`/portal/${params.main}/create/${params.model}`
        }
        if(user.crud.update)buttons.update = {
            variant:"update",
            text:"Update",
            link:`/portal/${params.main}/update/${params.model}/${params.id}`
        }
        if(user.crud.delete)buttons.delete ={
            variant:"delete",
            text:"Delete",
            link:`/portal/${params.main}/delete/${params.model}/${params.id}`
        }
        if(user.crud.read)buttons['filter'] = {
            variant:"act",
            text:"Search",
            link:`?modal=filter`
        };
    }
    return buttons;
}