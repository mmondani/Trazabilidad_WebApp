import { Firestore } from "firebase-admin/firestore"

export type User = {
    email: string,
    password: string,
    createdAt: number,
    level: string
};

export const userExists = async (db: Firestore, email: string) => {
    const userList = await db.collection("users").where("email", "==", email).get();

    if (userList.empty) {
        return false
    }
    else {
        return true;
    }
};