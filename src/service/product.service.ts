import fs from "fs";
import path from "node:path";
import type { Product } from "../types/product";

const filePath = path.join(process.cwd(), "./src/database/db.json");
export function productService() {
    const results = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(results);
}

export function createProduct(payload: Product[]) {
    fs.writeFileSync(filePath, JSON.stringify(payload));
}
