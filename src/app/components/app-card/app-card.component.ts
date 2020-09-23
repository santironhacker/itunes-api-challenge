import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ItunesMusicData } from 'src/app/models/itunes-music-data.model';

@Component({
    selector: 'app-card',
    templateUrl: './app-card.component.html',
    styleUrls: ['./app-card.component.sass']
})

export class AppCardComponent {
    @Input() songInfo: ItunesMusicData;
    @Input() index: number;
    @Input() favoriteIds: Object;
    @Output() addFavorite: EventEmitter<number> = new EventEmitter<number>();

    constructor() {}

    addToFavorites(trackId) {
        this.addFavorite.emit(trackId);
    }
}
