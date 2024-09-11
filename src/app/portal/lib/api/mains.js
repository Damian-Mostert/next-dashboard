import actions from "./actions";
import getUserServer from "@portal/lib/js/get-user-server";

export default {
    async logs(params,data){
        return await actions[params.action+"-log"](params,data,await getUserServer())
    },
    async content(params,data){
        return await actions[params.action](params,data,await getUserServer())
    },
    async user(params,data){
        params.model = "users"
        return await actions[params.action](params,data,await getUserServer())
    }
}