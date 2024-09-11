"use client";

import TableMap from "../components/table-map";
import { useEffect, useState } from "react";
import callApi from "@portal/lib/js/call-api";
import Loader from "@portal/lib/components/global/loader";
import Container from "@portal/lib/components/global/container";
import Button from "@portal/lib/components/global/button";
import { useRouter } from "next/navigation";

export default function Delete({ params }) {
	
	const router = useRouter();

	const [items, setItems] = useState(null);

	const loadItems = async () => {
		const data = await (callApi({...params,action:"details"}, {}));
		setItems(data);
	};
	useEffect(() => {
		loadItems();
	}, [params]);

	return (
		<Container type="scrollable">
			{items && items != "deleting" && <>
				{items!="completed"&&<>
				<div className="p-8 pb-2 w-full text-center text-2xl">
					Please read the whole document before deleting it.
				</div>
				<TableMap data={items}/>
				<Warning><span className="text-black font-bold">Warning !!</span><br/>You are about to delete an item<br/>MODEL <span className="text-blue-700 font-bold">{params.model}</span> WITH ID <span className="font-bold text-green-600">{params.id}</span>, This action can not be undone!</Warning>
				<div className="m-auto w-max pt-16 pb-32">
					<Button onClick={async()=>{
						setItems(null);
						await callApi(params);
						router.push(`/portal/${params.main}/index/${params.model}`)
					}} text={"Delete "+params.id} variant="delete"/>
				</div>
				</>}
			</>}
			{items && items == "deleting" && <Loader text={"Deleting "+params.id+"..."} subtext={"Please await..."}/>}
			{!items && <Loader text={"Loading details..."}/>}
		</Container>
	);
}
function Warning({children}){
	return<h2 className="w-full text-center p-6 pt-16 text-2xl uppercase">
	    <div className=" text-red-500 bg-yellow-300 bg-opacity-50 w-max m-auto p-8 px-16 rounded-xl font-bold max-w-[550px]">{children}</div>
    </h2>
}
