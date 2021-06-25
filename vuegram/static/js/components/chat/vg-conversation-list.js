export default {
    template: `

    `,

    name: 'vg-conversation-list',

    data() {
        return {
            uri: null,
        }
    },

    computed: {

    },

    methods: {

    },

    created() {
        const schema = window.location.protocol === 'https:' && 'wss://' || 'ws://'
        this.uri = schema + window.location.host + '/'
        this.$store.commit('socket/SET_CONNECTION', this.uri)
    },
}
