import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FavoritesCounterService } from 'src/app/services/favorites-counter.service';
import { ItunesDataService } from '../../services/itunes-data.service';

@Component({
    selector: 'app-header',
    templateUrl: './app-header.component.html',
    styleUrls: ['./app-header.component.sass']
})

export class AppHeaderComponent implements OnInit, OnDestroy {
    favoritesCounter: number = 0;
    private counterSubscription: Subscription;

    constructor(
        private itunesDataService: ItunesDataService,
        private favoritesCounterService: FavoritesCounterService
    ) {}

    ngOnInit() {
        this.counterSubscription = this.favoritesCounterService.favoriteSongsCounterChanged
        .subscribe(
            (value: number) => {
                this.favoritesCounter = value;
            }
        )
    }

    ngOnDestroy() {
        this.counterSubscription.unsubscribe();
    }

    onInputChange(eventValue) {
        this.itunesDataService.getSongsData(eventValue, 0);
    }
}
