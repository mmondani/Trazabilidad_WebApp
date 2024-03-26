import { Firestore } from "firebase-admin/firestore"
import { Origin } from "../../origins/models/origins.model";
import { Batch } from "../../batchs/models/batchs.model";

export type Log = {
    user: string,
    timestamp: number,
    message: string
};

export const getLogs = async (db: Firestore) => {
    const logsList = await db.collection("logs").orderBy("timestamp", "desc").get();
    const logsListDocs = logsList.docs;
    const logs = logsListDocs.map ((doc) => {
        let data = doc.data();
        
        return {
            id: doc.id,
            ...data
        };
    });

    return {
        data: logs
    }
};


export const newLog = async (db: Firestore, user: string, message: string) => {
    const entry = db.collection("logs").doc();
    const log: Log = {
        user: user,
        message: message,
        timestamp: (new Date()).getTime()
    }

    await entry.set(log);
};


export const users_newUserMessage = (newUser: string, permissionLevel: string) => {
    return `Se creó el usuario ${newUser} con nivel de permiso ${permissionLevel}`;
}

export const users_modifyUserMessage = (modifiedUser:string, params) => {
    return `Se modificó el usuario ${modifiedUser}. Cambios: ${JSON.stringify(params)}`;
}

export const users_deleteUserMessage = (user: string) => {
    return `Se eliminó el usuario ${user}`;
}

export const origins_newOriginMessage = (identifier: string, description: string) => {
    return `Se creó el origen ${identifier} - ${description}`;
}

export const origins_modifyOriginMessage = (modifiedIdentifier:string, modifiedDescription:string, params) => {
    return `Se modificó el origen ${modifiedIdentifier} - ${modifiedDescription}. Cambios: ${JSON.stringify(params)}`;
}

export const origins_deleteOriginMessage = (identifier: string, description: string) => {
    return `Se eliminó el origen ${identifier} - ${description}`;
}

export const batchs_newBatchMessage = async (batch: Batch, origin: Origin) => {
    return `Se creó el batch para ${origin.identifier} - ${origin.description} semana/año ${batch.week}/${batch.year} desde/hasta ${batch.from}/${batch.to}`;
}

export const batchs_modifyBatchMessage = (originalBatch: Batch, origin: Origin, params) => {
    return `Se modificó el batch para ${origin.identifier} - ${origin.description} semana/año ${originalBatch.week}/${originalBatch.year} desde/hasta ${originalBatch.from}/${originalBatch.to}. Cambios: ${JSON.stringify(params)}}`;
}

export const batchs_deleteBatchMessage = (origin: Origin, week, year, from, to) => {
    return `Se eliminó el batch para ${origin.identifier}: ${origin.description} semana/año ${week}/${year} desde/hasta ${from}/${to}`;
}