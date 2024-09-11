"use client";

import TableMap from "../components/table-map";
import { useEffect, useState } from "react";
import callApi from "@portal/lib/js/call-api";
import Loader from "@portal/lib/components/global/loader";
import Container from "@portal/lib/components/global/container";
import Button from "@portal/lib/components/global/button";

import parseModelKeys from "@portal/lib/js/parse-model-keys";
import { useRouter } from "next/navigation";

export default function Editor({ params }) {
    const router = useRouter();
    const [schema,setSchema] = useState({});
	const [items, setItems] = useState(null);
    
	const loadItems = async () => {
        if(params.id){
            const response_2 = await (callApi({...params,action:"get-model-keys"}, {}));
            setSchema(parseModelKeys(response_2))
            const response = await (callApi({...params,action:"details"}, {}))
            setItems(response);
        }else{
            const response = await (callApi({...params,action:"get-model-keys"}, {}));
            setSchema(parseModelKeys(response))
            setItems(parseModelKeys(response))
        }
	};
	useEffect(() => {
		loadItems();
	}, [params]);

    const onUpdate = (key,value) =>{
        const keys = key.split("::").filter(key=>key!="")
        let newItems = {...items};

        let bld =  ``;
        switch(typeof value){
            case "array":
                for(let i of keys)bld+=`["${i.replace(/"/g,'\\"')}"]`;
                eval(`newItems${bld} = ${JSON.stringify(value)}`)
                break;
            case "object":
                for(let i of keys)bld+=`["${i.replace(/"/g,'\\"')}"]`;
                eval(`newItems${bld} = ${JSON.stringify(value)}`)
                break;
            default:
                for(let i of keys)bld+=`["${i.replace(/"/g,'\\"')}"]`;
                eval(`newItems${bld} = "${value.replace(/"/g,'\\"')}"`)
                break;
        }
        setItems(newItems);
    }

    const save = async() => {
        setItems("updating");
        const {id} = await callApi(params,items);
        router.push(`/portal/${params.main}/details/${params.model}/${id}`)
    }

	return (
		<Container type="scrollable">
			{items && items != "updating" && <>
				<TableMap schema={schema} edit={true} onUpdate={onUpdate} data={items}/>
                <div className="m-auto w-max p-8">
                    <Button onClick={save} text={"Save "+(params.id?params.id:"")} variant="update"/>
                </div>
			</>}
			{items && items == "updating" && <Loader text={"Deleting "+params.id+"..."} subtext={"Please await..."}/>}
			{!items && <Loader text={"Loading details..."}/>}
		</Container>
	);
}
