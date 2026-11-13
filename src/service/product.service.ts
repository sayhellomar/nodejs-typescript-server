import { readFileSync } from "node:fs";
import path from "node:path";

const filePath = path.join(process.cwd(), "./src/database/db.json");
export default function productService() {
    const results = readFileSync(filePath, "utf-8");
    return JSON.parse(results);
}
