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


export const getUsers = async (db: Firestore) => {
    const usersList = await db.collection("users").get();
    const usersListDocs = usersList.docs;
    const users = usersListDocs.map ((doc) => {
        let data = doc.data();
        delete data.password;
        
        return {
            id: doc.id,
            ...data
        };
    });

    return {
        data: users
    }
};


export const createUser = async (db: Firestore, user: User) => {
    let userExist = await userExists(db, user.email);

    if (userExist)
        return undefined;


    const entry = db.collection("users").doc();
    await entry.set(user);

    return {
        id: entry.id,
        email: user.email,
        level: user.level,
        createdAt: user.createdAt
    };
};


export const modifyUser = async (db: Firestore, id, params) => {
    const userDoc = db.collection("users").doc(id);
    const userData = await userDoc.get();

    if (userData.exists) {
        await userDoc.update(params);

        return {
            id: userData.id,
            email: userData.get("email"),
            level: userData.get("level"),
            createdAt: userData.get("createdAt")
        };
    }
    else {
        return undefined;
    }
};


export const deleteUser = async (db: Firestore, id) => {
    const userDoc = db.collection("users").doc(id);
    const userData = await userDoc.get();

    if (userData.exists) {
        await userDoc.delete();

        return true;
    }
    else {
        return false;
    }
};