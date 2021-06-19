import Message from "../../models/message.js"

export default {
    template: `
        
    `,

    name: 'vg-message',

    data() {
        return {
            selected: false,
            count: 0
        }
    },

    props: {
        msg: Object,
    },

    methods: {

    },

    computed: {
        classes() {

        }
    },
}
