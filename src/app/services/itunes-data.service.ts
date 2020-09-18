import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { ItunesMusicData } from '../models/itunes-music-data.model';
import { map, tap } from 'rxjs/operators';

@Injectable()
export class ItunesDataService {
    itunesDataChanged = new Subject<ItunesMusicData[]>();
    private itunesMusicData: ItunesMusicData[] = [];

    constructor(
        private http: HttpClient
    ) {}
    
    setItunesMusicData(musicData: ItunesMusicData[]) {
        this.itunesMusicData = musicData;
        this.itunesDataChanged.next(this.itunesMusicData.slice());
    }

    /* getItunesMusicData() {
        return this.itunesMusicData
    } */

    fetchSongsByArtist(searchTerm: string) {
        const url = `https://itunes.apple.com/search?term=${searchTerm}&entity=song`;
        return this.http
            .get<ItunesMusicData[]>(
                url
            )
            .pipe(
                map(itunesResponse => {
                    const itunesData: ItunesMusicData[] = [];
                    for (const key in itunesResponse['results']) {
                        if(itunesResponse['results'].hasOwnProperty(key)) {
                            itunesData.push({ ...itunesResponse['results'][key] })
                        }
                    }
                    return itunesData;
                  }),
                tap(itunesData => {
                    console.log('itunes Data ', itunesData);
                    this.setItunesMusicData(itunesData);
                }),
            )
    }
}
