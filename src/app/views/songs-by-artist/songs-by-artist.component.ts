import { Component } from '@angular/core';
import {  ItunesMusicData } from '../../models/itunes-music-data.model';

@Component({
    selector: 'songs-by-artist',
    templateUrl: './songs-by-artist.component.html'
})

export class SongsByArtistComponent {
    private songsByArtist: ItunesMusicData[] = [
        {
            trackId: 528437613,
            artistName: "LINKIN PARK",
            collectionName: "Hybrid Theory",
            artistViewUrl: "https://itunes.apple.com/us/artist/linkin-park/id148662?uo=4",
            collectionViewUrl: "https://itunes.apple.com/us/album/in-the-end/id528436018?i=528437613&uo=4",
            artworkUrl30: "http://is5.mzstatic.com/image/thumb/Music/v4/a3/da/73/a3da7362-c9f7-a6a4-bd00-632776ac74c1/source/30x30bb.jpg",
            artworkUrl60: "http://is5.mzstatic.com/image/thumb/Music/v4/a3/da/73/a3da7362-c9f7-a6a4-bd00-632776ac74c1/source/60x60bb.jpg",
            artworkUrl100: "http://is5.mzstatic.com/image/thumb/Music/v4/a3/da/73/a3da7362-c9f7-a6a4-bd00-632776ac74c1/source/100x100bb.jpg"
        }
    ]

    constructor() {}
}