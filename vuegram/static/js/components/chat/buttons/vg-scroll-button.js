export default {
    template: `

    `,

    name: 'vg-scroll-button',

    props: {
        status: String
    },

    methods: {
        setAction() {
            this.$emit('do-action', 'scroll-bottom')
        }
    },
}
