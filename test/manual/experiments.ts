import { Blocker } from '../../src';
window.addEventListener('DOMContentLoaded', (event: Event) => {
    const blocker = new Blocker();
    blocker.on('done', (e: any) => {
        // do something
        // if (e.detail.disposable) {
        //     alert(blocker.options.disposable.message);
        // }
    });
});
