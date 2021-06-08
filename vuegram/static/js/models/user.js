const DEFAULT_NAME = 'Anonymous'

class User {
    /**
     * Represents a user.
     * @constructor
     * @param {Object} obj - User data ({id: int, name: string}).
     */
    constructor(obj) {
        this.id = obj.id
        this.name = obj.name
    }

    isAnonymous() {
        return true
    }

    isAuthenticated() {
        return false
    }

    get name() {
        return this.hasOwnProperty('_name') ? this._name : DEFAULT_NAME
    }

    set name(value) {
        this._name = value
    }
}

export default User
