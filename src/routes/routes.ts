import type { IncomingMessage, ServerResponse } from "http";
import productController from "../controllers/product.controller";
import sendResponse from "../utils/sendResponse";

export default function routeHandler(
    req: IncomingMessage,
    res: ServerResponse,
) {
    const { url, method } = req;

    if (url === "/" && method === "GET") {
        sendResponse(res, 200, true, "This is root route");
    } else if (url?.startsWith("/products")) {
        productController(req, res);
    } else {
        sendResponse(res, 404, false, "Not valid API route");
    }
}
