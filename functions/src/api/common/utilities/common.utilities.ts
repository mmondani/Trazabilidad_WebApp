import * as crypto from 'crypto';

export const hashPassword = (password: string) => {
    let salt = crypto.randomBytes(16).toString("base64");
    let hash = crypto.createHmac("sha256", salt)
                    .update(password)
                    .digest("base64");

    return salt + "$" + hash;
};