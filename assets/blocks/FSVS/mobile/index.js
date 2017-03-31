import 'fsvs/assets/js/bundle.js';

export default class FSVS {
    constructor() {
        this.fsvs;
        this.initial = false;
        // this.items = $('.fsvs-section');
        // this.button = $('.section__next');
        // this.section = $('.jsFsvsSection');
        // this.nav = $('.jsNav > li');
    }

    init() {
        if (this.initial) {
            return false;
        }
        this.fsvs = $.fn.fsvs({
            speed: 800,
            bodyID: 'fsvs-body',
            selector: '> .fsvs-section',
            mouseSwipeDisance: 40,
            afterSlide: (index) => {
            },
            beforeSlide: (index) => {
                // this.changeNav(index);
            },
            endSlide: () => {
            },
            mouseWheelEvents: true,
            mouseDragEvents: false,
            touchEvents: false,
            arrowKeyEvents: true,
            pagination: true,
            nthClasses: false,
            detectHash: true
        });

        this.initial = true;
        return true;
    }
    destroy() {
        this.fsvs.unbind();
    }
    refresh() {
        this.fsvs.rebind();
    }

    changeNav(index) {
        this.nav.eq(index).addClass('active').siblings().removeClass('active');
    }
}
