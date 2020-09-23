import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { ItunesMusicData } from '../models/itunes-music-data.model';
import { map, tap } from 'rxjs/operators';

@Injectable()
export class ItunesDataService {
    itunesDataChanged = new Subject<{
        data: ItunesMusicData[],
        newDataAvailable: boolean,
        searchTerm: string,
        isLoading: boolean
    }>();
    private itunesMusicData: ItunesMusicData[] = [];
    private searchTerm: string = '';
    private offset: number = 0;
    private isMoreContentAvailable: boolean = true;
    private isLoading: boolean = false;

    constructor(
        private http: HttpClient
    ) {}
    
    getSongsData(searchTerm?: string, offset?: number) {
        this.isLoading = true;
        offset ? this.offset += 50 : this.offset = 0;
        console.log('Offset is ', this.offset);
        console.log('Search term is ', searchTerm);
        if(searchTerm && searchTerm.length > 0) {
            this.searchTerm = searchTerm;
        }
        else if(searchTerm === '') {
            this.searchTerm = searchTerm;
            const itunesData: ItunesMusicData[] = [];
            this.setItunesMusicData(itunesData);
        }
        this.itunesDataChanged.next({
            data: this.itunesMusicData.slice(),
            newDataAvailable: this.isMoreContentAvailable,
            searchTerm: this.searchTerm,
            isLoading: this.isLoading
        });
        this.fetchSongsByArtist(this.searchTerm, this.offset).subscribe();
    }

    setItunesMusicData(musicData: ItunesMusicData[]) {
        if (this.offset) {
            this.itunesMusicData.push(...musicData);
        } else {
            this.itunesMusicData = musicData;
        }
        this.isLoading = false;
        this.itunesDataChanged.next({
            data: this.itunesMusicData.slice(),
            newDataAvailable: this.isMoreContentAvailable,
            searchTerm: this.searchTerm,
            isLoading: this.isLoading
        });
    }

    fetchSongsByArtist(searchTerm: string, offset: number) {
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
                    itunesData.length < 50 ? this.isMoreContentAvailable = false : this.isMoreContentAvailable = true;
                    return itunesData;
                    }),
                tap(itunesData => {
                    this.setItunesMusicData(itunesData);
                })
            )
    }
}
