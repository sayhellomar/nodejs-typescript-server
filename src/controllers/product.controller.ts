import type { IncomingMessage, ServerResponse } from "http";
import productService from "../service/product.service";
import type { Product } from "../types/product";
import bodyParser from "../utils/bodyParser";

export default async function productController(
    req: IncomingMessage,
    res: ServerResponse,
) {
    const { url, method } = req;
    const urlParam = url?.split("/");
    const id =
        urlParam && urlParam[1] === "products" ? Number(urlParam[2]) : null;

    if (url === "/products" && method === "GET") {
        const products = productService();
        res.writeHead(200, {
            "Content-Type": "application/json",
        });
        res.end(
            JSON.stringify({
                status: 200,
                message: "Success",
                data: products,
            }),
        );
    } else if (method === "GET" && id !== null) {
        const products = productService();
        const product = products.find(
            (singleProduct: Product) => singleProduct.id === id,
        );
        res.writeHead(200, {
            "Content-Type": "application/json",
        });
        res.end(
            JSON.stringify({
                status: 200,
                message: "Success",
                data: product,
            }),
        );
    } else if (url === "/products" && method === "POST") {
        const body = await bodyParser(req);
        console.log(body);
    }
}
