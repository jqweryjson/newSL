import 'bootstrap-sass/assets/javascripts/bootstrap/transition';
import 'bootstrap-sass/assets/javascripts/bootstrap/modal';

export class Modal {
    constructor(container) {
        this.container = container || $('.jsModal');
    }

    show(element) {
        this.container.modal('show');
    }
    hide() {
        this.container.modal('hide');
    }
}

export class ModalVideo {
    constructor(container) {
        this.container = container || $('.jsModalVideo');
        this.iframe = this.container.find('.modal-video__iframe');
        this.container.on('hide.bs.modal', () => {
            this.iframe.html('');
        });
    }

    show(element) {
        let video = this.setVideo(element);

        if (!video) return;

        this.container.modal('show');
        setTimeout(() => this.iframe.html(video).hide().fadeIn(1000), 400);
    }

    hide() {
        this.container.modal('hide');
        this.iframe.html('');
    }

    setVideo(element) {
        let source = element.data('src'),
            html = '<iframe class="iframe-youtube" width="100%" height="100%" src="' + source +
                   '?autoplay=1&rel=0" frameborder="0" allowfullscreen></iframe>';

        if (!source) {
            console.error('Не удалось получить источник для видео');
            return false;
        }
        return html;
    }
}
