import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import _components from "../components";
import _modals from "../modals";

function Popups({popups}){
    const router = useRouter();
    
}

function Build({components}){
    return components.map((component,key)=>{
        const Component = _components[component.name];
        const props = {};
        component.props.map(prop=>{props[prop.key] = prop.value})
        console.log(props)
        return <>{Component && <Component {...props} />}</>
    })
}

export default function DynamicPage({
    params,
}){
    const url = params.pages.join("/");
    const [popups,setPopups] = useState([]);
    const [components,setComponents] = useState([]);
    useEffect(()=>{
        axios.post("/api/dynamic-page",{url},{
            headers: {
                "Content-Type": "application/json",
            },
        }).then(response=>{
            const page = (response.data.page)
            if(page){
                setComponents(page.components)
                setPopups(page.popups)
            }
        })
    },[]);
    return <>
        <Build components={components}/>
        <Popups popups={popups}/>
    </>
}