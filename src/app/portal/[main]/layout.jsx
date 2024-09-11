"use client";

import Container from "@portal/lib/components/global/container"
import SideBar from "@portal/lib/components/global/bars/side";
import config from "@src/lib/config/models.map";

export default function Layout({params,children}){
    return <Container type={"left"} bar={<SideBar main={params.main} config={config.slugs}/>}>
        {children}
    </Container>
}
