import jwt from "jsonwebtoken";
import getConfig from "next/config";
import apiHandler from "utils/fetchWrapper";
import { NextApiRequest, NextApiResponse } from "next";

const { serverRuntimeConfig } = getConfig();

export default apiHandler({
    post: auth
});

async function auth(req: NextApiRequest, res: NextApiResponse) {
    const { token } = req.body;
    if (jwt.verify(token, serverRuntimeConfig.secret)) {
        return res.status(200).json({
            valid: true
        });
    }
    return res.status(200).json({
        valid: false
    });
}
