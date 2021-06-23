import Message from "../../models/message.js"

export default {
    template: `
        <li
            :id="msg.id"
            :class="classes"
            class="vg-message mx-3 mb-3"
            @mousedown="selectMessage"
            @mouseup="unselectMessage"
            @touchstart="selectMessage"
            @touchend="unselectMessage"
            @touchcancel="unselectMessage"
        >
            <div class="vg-message-balloon conversation-text">
                <div class="text-wrap p-2"  :class="{dashed: this.selected}">
                    <i>{{ msg._title }}</i>
                    <p>
                        {{ msg.text }}
                        <em class="d-inline-flex">
                            <time>{{ msg.date }}</time>
                            <i class="ri-check-double-line"></i>
                        </em>
                    </p>
                </div>
            </div>
            <a 
                v-show="this.selected"
                class="animate__animated animate__rubberBand p-1 text-center">
                <i class="vg-like-icon ri-heart-line"></i> 
            </a>
            <a 
                v-show="this.selected"
                class="vg-message-options animate__animated animate__rubberBand p-1 text-center">
                <i class="ri-more-2-line"></i> 
            </a>
        </li>
    `,

    name: 'vg-message',

    data() {
        return {
            selected: false,
            interval: false,
            count: 0
        }
    },

    props: {
        isScrolling: Boolean,
        msg: Object,
    },

    methods: {
        selectMessage() {
            if (!this.interval) {
                this.interval = setInterval(() => {
                    this.count++
                    if (this.count > 30 && !this.isScrolling) {
                        this.selected = true
                    }
                }, 30)
            }
        },

        unselectMessage() {
            if (this.count <= 30 && !this.isScrolling) {
                this.selected = false
            }
            clearInterval(this.interval)

            this.interval = false
            this.count = 0
        }
    },

    computed: {
        classes() {
            let odd = false
            try {
                odd = this.$store.state.auth.user.id.toString() !== this.msg.user.id.toString()
            } catch (e) {}
            return {
                clearfix: true,
                animate__animated: true,
                animate__fadeInDown: this.msg.id !== null,
                animate__fadeOutUp: this.msg.id === null,
                odd: odd,
                dashed: this.selected,
            };
        }
    },
}
