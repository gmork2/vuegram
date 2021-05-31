/**
 * socket.readyState enum.
 */
class Enum {
    static CONNECTING = new Enum('CONNECTING', 0)
    static OPEN = new Enum('OPEN', 1)
    static CLOSING = new Enum('CLOSING', 2)
    static CLOSED = new Enum('CLOSED', 3)

    static get values() {
        return [this.CONNECTING, this.OPEN, this.CLOSING, this.CLOSED]
    }

    static fromString(name) {
        const value = this[name]
        if (value) return value

        throw new RangeError(
            `No instance of ${this.constructor.name} exists with the name ${name}.`
        )
    }

    constructor(name, index) {
        this.name = name
        this.index = index
        Object.freeze(this)
    }

    toJSON() {
        return this.name
    }
}

Enum = new Proxy(Enum, {
    construct() {
        throw new TypeError(
            `${Enum.name} is an enum; no instances of it can be constructed.`
        )
    },
    defineProperty() {
        throw new TypeError(
            `${Enum.name} is an enum; no new properties can be appended to it.`
        )
    },
    deleteProperty() {
        throw new TypeError(
            `${Enum.name} is an enum; no new properties can be appended to it.`
        )
    },
    set() {
        throw new TypeError(
            `${Enum.name} is an enum; its instances cannot be modified.`
        )
    },
    setPrototypeOf() {
        throw new TypeError(
            `${Enum.name} is an enum; its prototype cannot be changed.`
        )
    },
})

export default Enum
