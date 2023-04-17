import apiHandler from "utils/fetchWrapper";
import jwt from "jsonwebtoken";
import getConfig from "next/config";
import { userService } from "services/usersService";
import { NextApiRequest, NextApiResponse } from "next";

const { serverRuntimeConfig } = getConfig();

export default apiHandler({
    post: signUp
});

async function signUp(req: NextApiRequest, res: NextApiResponse) {
    const user = req.body;

    if (userService.getUserByEmail(user.email)) throw `User "${user.name}" already exists`;

    const newUser = await userService.save(user);

    const token = jwt.sign({ sub: user.id }, serverRuntimeConfig.secret, { expiresIn: "7d" });

    return res.status(201).json({ user: newUser, token });
}
