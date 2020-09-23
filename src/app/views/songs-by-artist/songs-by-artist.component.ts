import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FavoritesCounterData } from 'src/app/models/favorites-counter-data.model';
import { FavoritesCounterService } from 'src/app/services/favorites-counter.service';
import { ItunesDataService } from 'src/app/services/itunes-data.service';
import { ItunesMusicData } from '../../models/itunes-music-data.model';

@Component({
    selector: 'songs-by-artist',
    templateUrl: './songs-by-artist.component.html'
})

export class SongsByArtistComponent implements OnInit {
    private subscription: Subscription;
    private counterSubscription: Subscription;
    public songsByArtist: ItunesMusicData[] = [];
    public isLoading: boolean = false;
    public isNewDataAvailable: boolean = true;
    public searchTerm: string = '';
    public favoritesIdsCollection: Object = {};

    constructor(
        private itunesDataService: ItunesDataService,
        private favoritesCounterService: FavoritesCounterService
    ) {}

    ngOnInit() {
        this.subscription = this.itunesDataService.itunesDataChanged
        .subscribe(
            (itunesMusicData: {
                data: ItunesMusicData[],
                newDataAvailable: boolean,
                searchTerm: string,
                isLoading: boolean
            }) => {
                this.songsByArtist = itunesMusicData.data;
                this.isNewDataAvailable = itunesMusicData.newDataAvailable;
                this.searchTerm = itunesMusicData.searchTerm;
                this.isLoading = itunesMusicData.isLoading;
            },
            error => {
                console.log('An error ocurred', error);
                this.isLoading = false;        
            },
            () => {
                console.log('Observable Completed');
        
            }
        );
        this.counterSubscription = this.favoritesCounterService.favoriteSongsCounterChanged
        .subscribe(
            (favoritesCounterData: FavoritesCounterData) => {
                Object.assign(this.favoritesIdsCollection, favoritesCounterData.favoritesIds);
                // console.log('Favorites collection is ', this.favoritesIdsCollection);
            }
        )
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.counterSubscription.unsubscribe();
    }

    onScrollToBottom() {
        this.isLoading = true;
        this.isNewDataAvailable = true;
    }

    addToFavorites(trackId: number) {
        this.favoritesCounterService.addSongToFavourites(trackId);
    }
}
