export default {
    data() {
        return {
            fonts: [
                { name: 'Roboto Condensed', value: 1 },
                { name: 'Roboto Mono', value: 2 },
                { name: 'Playfair Display', value: 3 },
            ]
        }
    },
    methods: {
        getFont(value) {
            for (let i = 0; i < this.fonts.length; i++) {
                if (this.fonts[i].value === value) {
                    return this.fonts[i].name
                }
            }
        }
    }
};
