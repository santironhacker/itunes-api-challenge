import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppHeaderComponent } from './components/app-header/app-header.component';
import { SongsByArtistComponent } from './views/songs-by-artist/songs-by-artist.component';
import { AlbumsByArtistComponent } from './views/albums-by-artist/albums-by-artist.component';
import { AppCardComponent } from './components/app-card/app-card.component';
import { IonicModule } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';
import { ItunesDataService } from './services/itunes-data.service';

import { WindowScrollDirective } from './directives/windows-scroll.directive';

@NgModule({
  declarations: [
    AppComponent,
    AppHeaderComponent,
    SongsByArtistComponent,
    AlbumsByArtistComponent,
    AppCardComponent,
    WindowScrollDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    IonicModule.forRoot()
  ],
  providers: [ItunesDataService],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
