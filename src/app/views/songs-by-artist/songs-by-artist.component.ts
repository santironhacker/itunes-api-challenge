import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ItunesDataService } from 'src/app/services/itunes-data.service';
import { ItunesMusicData } from '../../models/itunes-music-data.model';

@Component({
    selector: 'songs-by-artist',
    templateUrl: './songs-by-artist.component.html'
})

export class SongsByArtistComponent implements OnInit {
    private subscription: Subscription;
    public songsByArtist: ItunesMusicData[] = [];
    public isLoading: boolean = false;
    public isNewDataAvailable: boolean = true;
    public searchTerm: string = '';

    constructor(private itunesDataService: ItunesDataService) {}

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
        )
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    onScrollToBottom() {
        this.isLoading = true;
        this.isNewDataAvailable = true;
    }
}
