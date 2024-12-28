import { createRouter } from "@/lib/create-app";
import * as routes from './routes'
import * as handlers from './handlers'
const router = createRouter();
// * Linking Routes and handlers to the openapi to generate the documentation
router.openapi(routes.first_route,handlers.first_route_handler)


export default router;
