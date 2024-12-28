import configureOpenAPI from "@/lib/configure-open-api";
import createApp from "@/lib/create-app";
import {cors} from "hono/cors"
const app = createApp();

configureOpenAPI(app);

app.use("*",cors({
    origin:"*",
    allowMethods:["GET","POST","PUT","DELETE","OPTIONS"],
    allowHeaders:["Content-Type","Authorization","Accept","Origin","X-Requested-With","Access-Control-Allow-Origin"],
}))
app.get("/",(c)=>{
    return c.text("Hello World")
})
export default app;
