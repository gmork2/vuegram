export default {
    template: `
        <transition
            name="custom-classes-transition"
            enter-active-class="animate__animated animate__fadeInRight"
            leave-active-class="animate__animated animate__fadeOutRight">
            <span class="vg-circle overflow-hidden">
                <i
                    class="ri-arrow-down-s-line"
                    @click="setAction">
                </i>
            </span>
        </transition>
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
