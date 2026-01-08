import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AddReelComponent } from './pages/add-reel/add-reel.component';
import { PlayerComponent } from './pages/player/player.component';
import { ProfileComponent } from './pages/profile/profile.component';
const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'add', component: AddReelComponent },
  { path: 'play/:id', component: PlayerComponent },
  { path: 'profile', component: ProfileComponent }
];
@NgModule({
  imports: [RouterModule.forRoot(routes, {
      useHash: true
    })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
