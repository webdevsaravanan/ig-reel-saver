import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { AddReelComponent } from './pages/add-reel/add-reel.component';
import { PlayerComponent } from './pages/player/player.component';
import { BottomNavComponent } from "./pages/bottom-nav/bottom-nav.component";
import { HeaderComponent } from './pages/header/header.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ServiceWorkerModule } from '@angular/service-worker';

@NgModule({
  declarations: [AppComponent,HomeComponent,AddReelComponent,PlayerComponent,HeaderComponent,BottomNavComponent,ProfileComponent],
  imports: [BrowserModule, FormsModule, AppRoutingModule, ServiceWorkerModule.register('ngsw-worker.js', {
  enabled: !isDevMode(),
  // Register the ServiceWorker as soon as the application is stable
  // or after 30 seconds (whichever comes first).
  registrationStrategy: 'registerWhenStable:30000'
})],
  bootstrap: [AppComponent]
})
export class AppModule {}
