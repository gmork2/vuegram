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
    static MIN_ELAPSED_TIME = 60
    static MAX_ELAPSED_TIME = 3600

    /**
     * Represents a message.
     * @constructor
     * @param {Object} data - Object data.
     */
    constructor(data) {
        super(data)

        this._title = data.title || data._title
        this.text = data.text || ''
        this.read = true
        this.timestamp = Date.now()
        this.date = DEFAULT_DATE
    }

    get title() {
        return this._title || this.user.name
    }

    set title(value) {
        this._title = value
    }

    /**
     * Updates the string date according elapsed time.
     * @returns {number}
     */
    updateDate() {
        const elapsed = this.getElapsedTime()

        if (elapsed >= Message.MIN_ELAPSED_TIME)
            if (elapsed < Message.MAX_ELAPSED_TIME)
                this.date = Math.trunc(elapsed / 60) + ' min ago'
            else
                this.date = this.date.toISOString().substr(11, 5)

        return elapsed
    }

    getElapsedTime() {
        const date = new Date(this.timestamp)
        return Math.trunc((Date.now() - date) / 1000)
    }
}

export default Message
