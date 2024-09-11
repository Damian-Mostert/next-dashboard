
"use client";
import "@portal/lib/styles/global.scss";

import Container from "@portal/lib/components/global/container";
import config from "@src/lib/config/models.map";
import TopBar from "@portal/lib/components/global/bars/top";

export default function DashboardLayout({children}) {  
	return (<><Container bar={<TopBar theme={true} icon={true} title={process.env.NEXT_PUBLIC_APP_NAME + " - Dashboard"} buttons={Object.keys(config.mains).map(key=>config.mains[key]).map((i)=>({...i,link:`/portal/${i.link}`}))}/>}>
			{children}
	</Container><main blocker="true"/></>);
}
