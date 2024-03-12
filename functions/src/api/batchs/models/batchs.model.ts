import { Firestore } from "firebase-admin/firestore"

export type Batch = {
    originId: string,
    week: number,
    year: number,
    from: number,
    to: number,
    createdAt: number
};


export const batchExists = async (db: Firestore, batch: Batch) => {
    const batchsList = await db.collection("batchs")
                                    .where("originId", "==", batch.originId)
                                    .where("week", "==", batch.week)
                                    .where("year", "==", batch.year)
                                    .where("from", "==", batch.from)
                                    .where("to", "==", batch.to)
                                    .get();

    if (batchsList.empty) {
        return false
    }
    else {
        return true;
    }
};


export const getBatchs = async (db: Firestore) => {
    const batchsList = await db.collection("batchs").orderBy("createdAt").get();
    const batchsListDocs = batchsList.docs;
    const batchs = batchsListDocs.map ((doc) => {
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


export const getBatchById = async (db: Firestore, id: string) => {
    const batchsDoc = await db.collection("batchs").doc(id);
    const batchData = await batchsDoc.get();

    return {
            id: batchData.id,
            originId: batchData.get("originId"),
            week: batchData.get("week"),
            year: batchData.get("year"),
            from: batchData.get("from"),
            to: batchData.get("to"),
            createdAt: batchData.get("createdAt")
        }; 
};


export const getNextFrom = async (db: Firestore, params) => {
    let nextFrom;

    const batchsList = await db.collection("batchs")
                                    .where("originId", "==", params.originId)
                                    .where("week", "==", params.week)
                                    .where("year", "==", params.year)
                                    .get();

    if (batchsList.empty) {
        nextFrom = 0;
    }
    else {
        const batchsListDocs = batchsList.docs;

        nextFrom = 0;
        batchsListDocs.forEach((doc) => {
            if (doc.get("to") > nextFrom)
                nextFrom = doc.get("to") + 1;
        })
    }

    return {
        originId: params.originId,
        week: params.week,
        year: params.year,
        from: nextFrom
    };
};


export const createBatch = async (db: Firestore, batch: Batch) => {
    let batchExist = await batchExists(db, batch);

    if (batchExist)
        return undefined;

    const entry = db.collection("batchs").doc();
    await entry.set(batch);

    return {
        id: entry.id,
        originId: batch.originId,
        week: batch.week,
        year: batch.year,
        from: batch.from,
        to: batch.to,
        createdAt: batch.createdAt
    };
};


export const modifyBatch = async (db: Firestore, id, params) => {
    const batchDoc = db.collection("batchs").doc(id);
    const batchData = await batchDoc.get();

    if (batchData.exists) {
        await batchDoc.update(params);
        const modifiedBatchData = await batchDoc.get();

        return {
            id: modifiedBatchData.id,
            originId: modifiedBatchData.get("originId"),
            week: modifiedBatchData.get("week"),
            year: modifiedBatchData.get("year"),
            from: modifiedBatchData.get("from"),
            to: modifiedBatchData.get("to")
        };
    }
    else {
        return undefined;
    }
};


export const deleteBatch = async (db: Firestore, id) => {
    const batchDoc = db.collection("batchs").doc(id);
    const batchData = await batchDoc.get();

    if (batchData.exists) {
        await batchDoc.delete();

        return [true, batchData.get("originId"), batchData.get("week"), batchData.get("year"), batchData.get("from"), batchData.get("to")];
    }
    else {
        return [false];
    }
};