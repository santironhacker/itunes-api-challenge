import { Subject } from 'rxjs';

export class FavoritesCounterService {
    favoriteSongsCounterChanged = new Subject<number>();
    private favoriteSongCounter: number = 0;

    constructor() {}

    addSongToFavourites() {
        this.favoriteSongCounter += 1;
        this.favoriteSongsCounterChanged.next(this.favoriteSongCounter);
    }
}
