import getConfig from "next/config";
import expressJwt from "express-jwt";
import { NextApiRequest, NextApiResponse } from "next";
import util from "util";

const { serverRuntimeConfig } = getConfig();

function errorHandler(err, res: NextApiResponse) {
    if (typeof err === "string") {
        const is404 = err.toLowerCase().endsWith("not found");
        const statusCode = is404 ? 404 : 400;
        return res.status(statusCode).json({ message: err });
    }
    if (err.name === "UnauthorizedError") {
        return res.status(401).json({ message: "Invalid Token" });
    }
    return res.status(500).json({ message: err.message });
}

function jwtMiddleware(req: NextApiRequest, res: NextApiResponse) {
    const middleware = expressJwt({ secret: serverRuntimeConfig.secret, algorithms: ["HS256"] }).unless({
        path: ["/api/login", "/api/auth", "/api/signUp"]
    });
    return util.promisify(middleware)(req, res);
}

export default function apiHandler(handler) {
    return async (req: NextApiRequest, res: NextApiResponse) => {
        const method = req.method.toLowerCase();
        if (!handler[method]) return res.status(405).end(`Method ${req.method} Not Allowed`);
        try {
            await jwtMiddleware(req, res);
            await handler[method](req, res);
        } catch (err) {
            errorHandler(err, res);
        }
    };
}
