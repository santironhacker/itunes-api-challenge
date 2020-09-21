import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';
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

    constructor(private itunesDataService: ItunesDataService) {}

    ngOnInit() {
        this.subscription = this.itunesDataService.itunesDataChanged
        .pipe(
            finalize(() => {
                this.isLoading = false;
            })
        )
        .subscribe(
            (itunesMusicData: {data: ItunesMusicData[], newDataAvailable: boolean}) => {
                this.songsByArtist = itunesMusicData.data;
                this.isNewDataAvailable = itunesMusicData.newDataAvailable;
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
