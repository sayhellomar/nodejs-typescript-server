import type { IncomingMessage, ServerResponse } from "http";
import { createProduct, productService } from "../service/product.service";
import type { Product } from "../types/product";
import bodyParser from "../utils/bodyParser";
import sendResponse from "../utils/sendResponse";

export default async function productController(
    req: IncomingMessage,
    res: ServerResponse,
) {
    const { url, method } = req;
    const urlParam = url?.split("/");
    const id =
        urlParam && urlParam[1] === "products" ? Number(urlParam[2]) : null;

    if (url === "/products" && method === "GET") {
        try {
            const products = productService();
            sendResponse(res, 200, true, "Success", products);
        } catch (error) {
            sendResponse(res, 500, false, "Internal server error");
        }
    } else if (method === "GET" && id !== null) {
        try {
            const products = productService();
            const product = products.find(
                (singleProduct: Product) => singleProduct.id === id,
            );
            if (!product) {
                return sendResponse(res, 404, false, "Not Found");
            }

            sendResponse(res, 200, true, "Success", product);
        } catch (error) {
            sendResponse(res, 500, false, "Internal server error");
        }
    } else if (url === "/products" && method === "POST") {
        try {
            const products = productService();
            const body = await bodyParser(req);
            const newProduct = {
                id: products.length + 1,
                title: body.title,
                description: body.description,
            };
            products.push(newProduct);
            createProduct(products);

            sendResponse(res, 201, true, "Created Successfully", newProduct);
        } catch (error) {
            sendResponse(res, 500, false, "Internal server error");
        }
    } else if (method === "PUT" && id !== null) {
        try {
            const products = productService();
            const body = await bodyParser(req);
            const index = products.findIndex(
                (singleProduct: Product) => singleProduct.id === id,
            );
            if (index < 0) {
                return sendResponse(res, 404, false, "Not Found");
            }
            products[index] = {
                id: products[index].id,
                ...body,
            };
            createProduct(products);
            sendResponse(
                res,
                200,
                true,
                "Updated Successfully",
                products[index],
            );
        } catch (error) {
            sendResponse(res, 500, false, "Internal server error");
        }
    } else if (method === "DELETE" && id !== null) {
        try {
            const products = productService();
            const index = products.findIndex(
                (singleProduct: Product) => singleProduct.id === id,
            );
            if (index < 0) {
                return sendResponse(res, 404, false, "Not Found");
            }
            products.splice(index, 1);
            createProduct(products);
            sendResponse(res, 200, true, "Deleted Successfully");
        } catch (error) {
            sendResponse(res, 500, false, "Internal server error");
        }
    }
}
