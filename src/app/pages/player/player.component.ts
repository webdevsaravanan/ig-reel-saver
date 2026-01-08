import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReelStorageService } from '../../services/reel-storage.service';
@Component({
  templateUrl: './player.component.html',
  standalone: false
})
export class PlayerComponent implements OnInit {
  reel: any;
  videoMp4Url = '';        // set from backend later
  showFallback = false;

  onVideoError() {
    this.showFallback = true;
  }

  constructor(private route: ActivatedRoute, private storage: ReelStorageService) {}
  ngOnInit() {
    this.reel = this.storage.getById(this.route.snapshot.paramMap.get('id')!);
    this.videoMp4Url = this.reel.reelUrl;;
  }
  openInstagram() { window.location.href = this.reel.reelUrl; }
}
