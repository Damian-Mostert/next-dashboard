"use client";

import Container from "@portal/lib/components/global/container"
import TextWithPortalIcon from "@portal/lib/components/global/text-with-portal-icon";

export default function({params}){
    return <Container type="center">
        <TextWithPortalIcon text={`Welcome to the ${process.env.NEXT_PUBLIC_APP_NAME} - ${params.main} portal`}/>
    </Container>
}