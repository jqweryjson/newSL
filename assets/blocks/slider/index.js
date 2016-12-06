import 'owl.carousel/dist/owl.carousel.js';

export default class Slider {
    constructor(container) {
        this.container = container;
    }

    init(options) {
        options = options || {};

        this.container.owlCarousel(options);
    }
}
