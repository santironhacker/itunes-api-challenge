import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SongsByArtistComponent } from './views/songs-by-artist/songs-by-artist.component';


const routes: Routes = [
  { path: '', redirectTo: '/songs-by-artist', pathMatch: 'full' },
  { path: 'songs-by-artist', component: SongsByArtistComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
