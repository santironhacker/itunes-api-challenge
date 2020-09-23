import { Subject } from 'rxjs';
import { FavoritesCounterData } from '../models/favorites-counter-data.model';

export class FavoritesCounterService {
    favoriteSongsCounterChanged = new Subject<FavoritesCounterData>();
    private favoriteSongCounter: number = 0;
    private favoritesIdsCollection: Object = {};

    constructor() {}

    addSongToFavourites(trackId: number) {
        this.favoriteSongCounter += 1;
        const trackObject = {};
        trackObject[trackId] = true;
        Object.assign(this.favoritesIdsCollection, trackObject);
        this.favoriteSongsCounterChanged.next({
            counter: this.favoriteSongCounter,
            favoritesIds: this.favoritesIdsCollection
        });
    }
}
