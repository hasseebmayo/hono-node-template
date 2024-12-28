import configureOpenAPI from "@/lib/configure-open-api";
import createApp from "@/lib/create-app";
import {cors} from "hono/cors"
import first_route from "@/routes"
const app = createApp();

configureOpenAPI(app);

app.use("*",cors({
    origin:"*",
    allowMethods:["GET","POST","PUT","DELETE","OPTIONS"],
    allowHeaders:["Content-Type","Authorization","Accept","Origin","X-Requested-With","Access-Control-Allow-Origin"],
}))
// * Attaching routes to the app
app.route("/",first_route)

export default app;
