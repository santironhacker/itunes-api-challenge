export class ItunesMusicData {
    constructor(
        public trackId: number,
        public artistName: string,
        public collectionName: string,
        public artistViewUrl: string,
        public collectionViewUrl: string,
        public artworkUrl30: string,
        public artworkUrl60: string,
        public artworkUrl100: string,
    ) {}
}
