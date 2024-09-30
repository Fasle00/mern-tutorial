// Description: Validation functions for user access levels.

/**
 * Checks if run in unsafe mode and returns true is so.
 * If not, checks if the users accessLevel is admin.
 * @param {User} user the session user
 * @returns boolean
 */
function isAdmin(user) {
    if (process.env.NODE_SAFE === "unsafe") return true;
    if (!user) return false;
    return user.accessLevel === "admin";
}

/**
 * Checks if run in unsafe mode and returns true is so.
 * If not, checks if the users accessLevel is editor.
 * @param {User} user the session user
 * @returns boolean
 */
function isEditor(user) {
    if (process.env.NODE_SAFE === "unsafe") return true;
    if (!user) return false;
    return user.accessLevel === "editor";
}

/**
 * Checks if run in unsafe mode and returns true is so.
 * If not, checks if the users accessLevel is admin or editor.
 * @param {User} user the session user
 * @returns boolean
 */
function isAdminOrEditor(user) {
    if (process.env.NODE_SAFE === "unsafe") return true;
    if (!user) return false;
    return user.accessLevel === "admin" || user.accessLevel === "editor";
}

/**
 * Checks if run in unsafe mode and returns true is so.
 * If not, checks if the users <code>accessLevel</code> is user.
 * @param {User} user the session user
 * @returns boolean
 */
function isUser(user) {
    if (process.env.NODE_SAFE === "unsafe") return true;
    if (!user) return false;
    return user.accessLevel === "user";
}

module.exports = { isAdmin, isEditor, isAdminOrEditor, isUser };
