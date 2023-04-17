import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import getConfig from "next/config";
import apiHandler from "utils/fetchWrapper";
import { NextApiRequest, NextApiResponse } from "next";
import { userService } from "services/usersService";

const { serverRuntimeConfig } = getConfig();

export default apiHandler({
    post: login
});

async function login(req: NextApiRequest, res: NextApiResponse) {
    const { email, password } = req.body;
    const user = userService.getUserByEmail(email);

    if (!(user && bcrypt.compareSync(password, user.password))) {
        throw "Username or password is incorrect";
    }

    const { password: _, ...userWithoutPassword } = user;
    const token = jwt.sign({ sub: user.id }, serverRuntimeConfig.secret, { expiresIn: "7d" });

    return res.status(200).json({
        user: userWithoutPassword,
        token
    });
}
