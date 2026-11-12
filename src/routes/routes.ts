import type { IncomingMessage, ServerResponse } from "http";
import productController from "../controllers/product.controller";

export default function routeHandler(
    req: IncomingMessage,
    res: ServerResponse,
) {
    const { url, method } = req;

    if (url === "/" && method === "GET") {
        res.writeHead(200, {
            "Content-Type": "application/json",
        });
        res.end(JSON.stringify({ message: "This is root route", status: 200 }));
    } else if (url?.startsWith("/products") && method === "GET") {
        productController(req, res);
    } else {
        res.writeHead(404, {
            "Content-Type": "application/json",
        });
        res.end(
            JSON.stringify({
                message: "This is not root route",
                status: 404,
            }),
        );
    }
}
