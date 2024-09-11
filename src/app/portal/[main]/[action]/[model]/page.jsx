"use client";

import Container from "@portal/lib/components/global/container";
import config from "@src/lib/config/models.map";
import getButtons from "@portal/lib/js/get-buttons";
import TopBar from "@portal/lib/components/global/bars/top";
import schemas from "@portal/lib/schemas"

export default function({params}){
    const {main, action, model} = params;
    const buttons = getButtons();
    const Component = schemas[action];
    return <>
        <Container type="top" bar={<TopBar title={`${main} | ${model} ${action != "index" ? " "+action:""}`} buttons={Object.keys(buttons).filter(key=>{
            return config.slugs[model].buttons[main]?.[action]?.filter(b=>key==b).length
        }).map(key=>buttons[key])}/>}>
            {Component && <Component params={params}/>}
        </Container>
    </>
}