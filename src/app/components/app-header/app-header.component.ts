import { Component } from '@angular/core';
import { ItunesDataService } from '../../services/itunes-data.service';

@Component({
    selector: 'app-header',
    templateUrl: './app-header.component.html',
    styleUrls: ['./app-header.component.sass']
})

export class AppHeaderComponent {
    constructor(
        private itunesDataService: ItunesDataService
    ) {}

    onInputChange(eventValue) {
        this.itunesDataService.fetchSongsByArtist(eventValue, 0).subscribe();
    }
}
