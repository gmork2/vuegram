import User from "./user.js"

const DEFAULT_DATE = 'now'

class BaseMessage {
    /**
     * Represents a message.
     * @constructor
     * @param {Object} data - Object data.
     */
    constructor(data) {
        if (!'user' in data)
            throw new ReferenceError("Message should has 'user' property!")

        this.user = new User(data.user)
        this.id = data.hasOwnProperty('id') ? data.id : Message.createId(this.user)
    }

    /**
     * Returns a new user id.
     * @param {User} user - Current logged user
     * @returns {string}
     */
    static createId(user) {
        return `${user.id + Date.now()}`
    }
}

class Message extends BaseMessage{

}

export default Message
