import { Firestore } from "firebase-admin/firestore"

export type Origin = {
    identifier: string,
    description: string,
    createdAt: number
};


export const originExists = async (db: Firestore, origin: Origin) => {
    const originsList = await db.collection("origins")
                                    .where("identifier", "==", origin.identifier)
                                    .get();

    if (originsList.empty) {
        return false
    }
    else {
        return true;
    }
};


export const getOrigins = async (db: Firestore) => {
    const originsList = await db.collection("origins").orderBy("createdAt").get();
    const originsListDocs = originsList.docs;
    const batchs = originsListDocs.map ((doc) => {
        let data = doc.data();
        
        return {
            id: doc.id,
            ...data
        };
    });

    return {
        data: batchs
    }
};


export const getOriginsById = async (db: Firestore, id: string) => {
    const originsDoc = await db.collection("origins").doc(id);
    const originData = await originsDoc.get();

    return {
            id: originData.id,
            identifier: originData.get("identifier"),
            description: originData.get("description"),
            createdAt: originData.get("createdAt"),
        }; 
};

export const createOrigin = async (db: Firestore, origin: Origin) => {
    let originExist = await originExists(db, origin);

    if (originExist)
        return undefined;

    const entry = db.collection("origins").doc();
    await entry.set(origin);

    return {
        id: entry.id,
        identifier: origin.identifier,
        description: origin.description,
        createdAt: origin.createdAt
    };
};


export const modifyOrigin = async (db: Firestore, id, params) => {
    const originDoc = db.collection("origins").doc(id);
    const originData = await originDoc.get();

    if (originData.exists) {
        await originDoc.update(params);
        const modifiedOriginData = await originDoc.get();

        return {
            id: modifiedOriginData.id,
            identifier: modifiedOriginData.get("identifier"),
            description: modifiedOriginData.get("description"),
        };
    }
    else {
        return undefined;
    }
};


export const deleteOrigin = async (db: Firestore, id) => {
    const originDoc = db.collection("origins").doc(id);
    const originData = await originDoc.get();

    if (originData.exists) {
        await originDoc.delete();

        return [true, originData.get("identifier"), originData.get("description")];
    }
    else {
        return [false];
    }
};