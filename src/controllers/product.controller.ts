import type { IncomingMessage, ServerResponse } from "http";

export default function productController(
    req: IncomingMessage,
    res: ServerResponse,
) {
    res.writeHead(200, {
        "Content-Type": "application/json",
    });
    res.end(
        JSON.stringify({
            message: "This is product route",
            status: 200,
        }),
    );
}
