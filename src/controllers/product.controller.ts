import type { IncomingMessage, ServerResponse } from "http";
import { createProduct, productService } from "../service/product.service";
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
        if (!product) {
            res.writeHead(404, {
                "Content-Type": "application/json",
            });
            res.end(
                JSON.stringify({
                    status: 404,
                    message: "Not Found",
                }),
            );
            return;
        }
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
        const products = productService();
        const body = await bodyParser(req);
        const newProduct = {
            id: products.length + 1,
            ...body,
        };
        products.push(newProduct);
        createProduct(products);
        res.writeHead(201, {
            "Content-Type": "application/json",
        });
        res.end(
            JSON.stringify({
                status: 201,
                message: "Created Successfully",
                data: newProduct,
            }),
        );
    } else if (method === "PUT" && id !== null) {
        const products = productService();
        const body = await bodyParser(req);
        const index = products.findIndex(
            (singleProduct: Product) => singleProduct.id === id,
        );
        if (index < 0) {
            res.writeHead(404, {
                "Content-Type": "application/json",
            });
            res.end(
                JSON.stringify({
                    status: 404,
                    message: "Not Found",
                }),
            );
            return;
        }
        products[index] = {
            id: products[index].id,
            ...body,
        };
        createProduct(products);
        res.writeHead(200, {
            "Content-Type": "application/json",
        });
        res.end(
            JSON.stringify({
                status: 200,
                message: "Updated Successfully",
                data: products[index],
            }),
        );
    } else if (method === "DELETE" && id !== null) {
        const products = productService();
        const index = products.findIndex(
            (singleProduct: Product) => singleProduct.id === id,
        );
        if (index < 0) {
            res.writeHead(404, {
                "Content-Type": "application/json",
            });
            res.end(
                JSON.stringify({
                    status: 404,
                    message: "Not Found",
                }),
            );
            return;
        }
        products.splice(index, 1);
        createProduct(products);
        res.writeHead(200, {
            "Content-Type": "application/json",
        });
        res.end(
            JSON.stringify({
                status: 200,
                message: "Deleted Successfully",
            }),
        );
    }
}
