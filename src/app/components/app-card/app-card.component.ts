import { Component, Input } from '@angular/core';
import { ItunesMusicData } from 'src/app/models/itunes-music-data.model';

@Component({
    selector: 'app-card',
    templateUrl: './app-card.component.html'
})

export class AppCardComponent {
    @Input() songInfo: ItunesMusicData;
    @Input() index: number;

    constructor() {}
}
