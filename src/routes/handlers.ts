import { first_route_type } from "@/routes/routes";
import { AppRouteHandler } from "@/types";
import * as HttpStatus from "stoker/http-status-codes";

export const first_route_handler:AppRouteHandler<first_route_type> = async (c)=>{
    // add your database logic here
    return c.json({
        message:"Hello World"
    },HttpStatus.OK)
}
