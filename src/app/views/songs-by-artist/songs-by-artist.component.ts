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
    public songsByArtist: ItunesMusicData[] = []

    constructor(private itunesDataService: ItunesDataService) {}

    ngOnInit() {
        this.subscription = this.itunesDataService.itunesDataChanged
        .subscribe(
            (itunesMusicData: ItunesMusicData[]) => {
                this.songsByArtist = itunesMusicData;
            }
        )
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}