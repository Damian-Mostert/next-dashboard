import createLog from "@portal/lib/js/create-log"
import db from "@src/lib/config/db";
const { models } = db;
function replaceFunctionsWithNames(obj) {
	const result = Array.isArray(obj) ? [] : {};
	for (const key in obj) {
		if (obj.hasOwnProperty(key)) {
		if (typeof obj[key] === 'function') {
			result[key] = obj[key].name || 'anonymous';
		} else if (typeof obj[key] === 'object' && obj[key] !== null) {
			result[key] = replaceFunctionsWithNames(obj[key]);
		} else {
			result[key] = obj[key];
		}
			}
	}
	return result;
}
export default {
	"get-model-keys-log":async(params , {} , user)=>{
		try{
			if(user.crud.read)
				return await new Promise(r=>{
					setTimeout(()=>r(models.log.schema.tree),1000)
				});
			else return {forbidden:true}
		} catch (error) {
			console.error(`Error fetching details: ${error}`);
			throw error;
		}
	},
	"index-log":async(params, {},user)=> {
		try{
			if(user.crud.read)
				return await models.log.find({model:params.model}).sort({ createdAt: -1 });
			else return {forbidden:true}
		} catch (error) {
			console.error(`Error fetching details: ${error}`);
			throw error;
		}
	},
	"details-log":async(params,{},user)=> {
		try{
			if(user.crud.read)
				return await models.log.findById(params.id);
			else return {forbidden:true}
		} catch (error) {
			console.error(`Error fetching details: ${error}`);
			throw error;
		} 
	},
	"get-model-keys":async(params , {}, user)=>{
		try{
			if(user.crud.read){
				return replaceFunctionsWithNames(models[params.model].schema.tree)
			}
			else return {forbidden:true} 
		} catch (error) {
			console.error(`Error fetching details: ${error}`);
			throw error;
		}
	},
	async index(params, {}, user) {
		try {
			if(user.crud.read)
				return await models[params.model].find({}).sort({ createdAt: -1 });
			else return {forbidden:true}
		} catch (error) {
			console.error(`Error fetching details: ${error}`);
			throw error;
		}
	},
	async details(params,{},user) {
		try {
			if(user.crud.read)
				return await models[params.model].findById(params.id);
			else return {forbidden:true}
		} catch (error) {
			console.error(`Error fetching details: ${error}`);
			throw error;
		}
	},
	async update(params, data,user) {
		try {
			if(user.crud.update){
				await createLog({
					user_id:user._id,
					...params,
					content:await models[params.model].findById(params.id)
				});
				await models[params.model].findByIdAndUpdate(params.id, data)
				return {id:params.id};
			} else return {forbidden:true}
		} catch (error) {
			console.error(`Error updating record: ${error}`);
			throw error;
		}
	},
	async delete(params,{},user) {
		try {
			if(user.crud.delete){
				await createLog({
					user_id:user._id,
					...params,
					content:{...await models[params.model].findById(params.id)}
				});
				return await models[params.model].findByIdAndDelete(params.id);
			} else return {forbidden:true}
		} catch (error) {
			console.error(`Error deleting record: ${error}`);
			throw error;
		}
	},
	async create(params,new_data,user) {
		try {
			if(user.crud.create){
				await createLog({
					user_id:user._id,
					...params,
					content:new_data
				});
				let n = {};
				Object.keys(new_data).filter(k=>k!="_id"&&k!="__v").map(k=>n[k] = new_data[k])
				var mdl = new models[params.model](n);
				const data = await(mdl.save());
				console.log(data,mdl)
				return {id:data._id};
			} else return {forbidden:true}
		} catch (error) {
			console.error(`Error creating record: ${error}`);
			throw error;
		}
	}
};
