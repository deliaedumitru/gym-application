
import {getUser} from "../api/gym";

/**
 * Return the role of the user.
 * Either ADMIN, TRAINER, USER, ANON
 */
export const getUserRole = () => {
    const user = getUser();
    if(user === null) return "ANON";
    if(user.role === 0) return 'ADMIN';
    if(user.role === 1) return 'TRAINER';
    return 'USER';
};

/**
 * Return the name of the user
 * @returns {*|string}
 */
export const getUsername = () => {
    const user = getUser();
    return user.username;
};