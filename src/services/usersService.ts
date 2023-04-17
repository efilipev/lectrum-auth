import fs from "fs";
import bcrypt from "bcryptjs";
import { v4 as uuid } from "uuid";
import { Contact } from "../utils/types";
import users from "../../data/credentials.json";

class UsersService {
    private users: Array<Contact> = [];

    constructor(users) {
        this.users = users;
    }

    async save(user: Contact): Promise<Contact> {
        const password = await bcrypt.hash(user.password, 10);
        user.id = uuid();
        user.created = new Date();
        users.push({ ...user, password });
        this.saveData();
        return user;
    }

    getAllUsers(): Array<Contact> {
        return this.users;
    }
    getUserById(id: string): Contact | undefined {
        return this.users.find((user: Contact) => user.id.toString() === id.toString());
    }

    getUserByEmail(email: string): Contact | undefined {
        return this.users.find((user: Contact) => user.email === email);
    }

    private saveData() {
        fs.writeFileSync("data/credentials.json", JSON.stringify(users, null, 4));
    }
}

export const userService = new UsersService(users);
