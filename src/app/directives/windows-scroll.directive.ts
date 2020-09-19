import { Directive, NgZone } from '@angular/core';

@Directive({
    selector: '[appWindowsScroll]'
})

export class WindowScrollDirective {

    private eventOptions: boolean|{capture?: boolean, passive?: boolean};

    constructor(private ngZone: NgZone) {}

    ngOnInit() {            
        this.ngZone.runOutsideAngular(() => {
            window.addEventListener('scroll', this.scroll, <any>this.eventOptions);
        });
    }

    ngOnDestroy() {
        //unfortunately the compiler doesn't know yet about this object, so we cast to any
        window.removeEventListener('scroll', this.scroll, <any>this.eventOptions);
    }

    scroll = (): void => {
        if ((window.innerHeight + window.scrollY) >= document.body.scrollHeight) {
           this.ngZone.run(() => {
               this.tellAngular();
           });
        }
    };

    tellAngular() {
        console.log('Window scrolled')
    }
}