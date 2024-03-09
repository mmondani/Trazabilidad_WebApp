import * as crypto from 'crypto';

export const hashPassword = (password: string) => {
    let salt = crypto.randomBytes(16).toString("base64");
    let hash = crypto.createHmac("sha256", salt)
                    .update(password)
                    .digest("base64");

    return salt + "$" + hash;
};

export const isPasswordCorrect = (incomingPassword, storedPassword) => {
    let passwordFields = storedPassword.split("$");
    let salt = passwordFields[0];

    let hash = crypto.createHmac("sha256", salt)
        .update(incomingPassword)
        .digest("base64");
    
    if (hash === passwordFields[1])
        return true;
    else
        return false;
};

export const getCurrentWeekNumber = () => {
    let currentDate: any = new Date();
    let startDate: any = new Date(currentDate.getFullYear(), 0, 1);
    let days = Math.floor((currentDate - startDate) /
        (24 * 60 * 60 * 1000));
    
    let weekNumber = Math.ceil(days / 7);

    return weekNumber;
}