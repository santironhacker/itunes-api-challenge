import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { ItunesMusicData } from '../models/itunes-music-data.model';
import { map, tap } from 'rxjs/operators';

@Injectable()
export class ItunesDataService {
    itunesDataChanged = new Subject<ItunesMusicData[]>();
    private itunesMusicData: ItunesMusicData[] = [];
    private searchTerm: string = '';
    private offset: number = 0;

    constructor(
        private http: HttpClient
    ) {}
    
    setItunesMusicData(musicData: ItunesMusicData[]) {
        if (this.offset) {
            this.itunesMusicData.push(...musicData);
        } else {
            this.itunesMusicData = musicData;
        }
        this.itunesDataChanged.next(this.itunesMusicData.slice());
    }

    fetchSongsByArtist(searchTerm?: string, offset?: number) {
        if (searchTerm) { this.searchTerm = searchTerm; }
        offset ? this.offset += 50 : this.offset = 0;
        console.log('Offset is ', this.offset);
        console.log('Search term is ', this.searchTerm);
        const url = `https://itunes.apple.com/search?term=${this.searchTerm}&entity=song&offset=${this.offset}`;
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
                    this.setItunesMusicData(itunesData);
                }),
            )
    }
}
