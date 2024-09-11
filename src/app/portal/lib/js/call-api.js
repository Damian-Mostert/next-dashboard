import axios from "axios";

export default async function callApi(params,data={}){
	var url = "/api/portal/"
	if(params.main)
		url+=params.main+"/"
	if(params.model)
		url+=params.model+"/"
	if(params.action)
		url+=params.action+"/"
	if(params.id)
		url+=params.id+"/" 
	const response = await axios.post(process.env.NEXT_PUBLIC_NEXT_URL+url, JSON.stringify(data), {
		headers: {
			"Content-Type": "application/json",
		},
	});
	return response.data;
}
