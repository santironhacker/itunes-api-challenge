import { Directive, EventEmitter, NgZone, Output } from '@angular/core';
import { ItunesDataService } from '../services/itunes-data.service';

@Directive({
    selector: '[appWindowsScroll]',
    outputs: ['onScrollToBottom']
})

export class WindowScrollDirective {
    private eventOptions: boolean|{capture?: boolean, passive?: boolean};
    @Output() scrolledToBottom: EventEmitter<any> = new EventEmitter();

    constructor(
        private ngZone: NgZone,
        private itunesDataService: ItunesDataService
    ) {}

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
               this.itunesDataService.getSongsData(null, 1);
               this.scrolledToBottom.emit();
               console.log('Scrolled to bottom');
           });
        }
    };
}