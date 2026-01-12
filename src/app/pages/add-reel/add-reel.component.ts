import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReelStorageService } from '../../services/reel-storage.service';
import { Reel } from '../../models/db.model';
import { ReelItem } from '../../models/reel.model';
@Component({
  templateUrl: './add-reel.component.html',
  standalone: false
})
export class AddReelComponent implements OnInit {
  reelUrl = ''; title = ''; hashtags = ''; editReelId='';
  reelUrlInput: any;
  isReelUrlDisabled = false;
  constructor(private route: ActivatedRoute, private storage: ReelStorageService, private router: Router) {}
  ngOnInit() {
    if (localStorage.getItem('dark') === '1') {
      document.body.classList.add('dark');
    }
    if(this.route.snapshot.queryParamMap.get('reelUrl')){
      this.reelUrl = this.route.snapshot.queryParamMap.get('reelUrl') || '';
      this.isReelUrlDisabled = true;
      this.editReelId="";
    }
    if(this.route.snapshot.queryParamMap.get('editReelId')){
      this.editReelId=this.route.snapshot.queryParamMap.get('editReelId')||"";
      this.isReelUrlDisabled = true;
      const data =this.storage.getById(this.editReelId);
      data.then((reel:Reel[])=>{
        this.title=reel[0].title;
        this.reelUrl=reel[0].reelUrl;
        this.hashtags=reel[0].hashtags.toString();
      })

    }
  }

  save() {
    if(this.title!=""&& this.hashtags!=""&&this.reelUrl!=""&&this.title.length<=30&&this.hashtags.length<=30){
      const reelInput: ReelItem = {
      id: this.editReelId==""?Date.now().toString():this.editReelId,
      title: this.title,
      hashtags: this.hashtags.split(',').map(h => h.trim().toLowerCase()),
      reelUrl: this.reelUrl,
      favorite: false,
      createdAt: Date.now()
    }
    this.editReelId==""?this.storage.save(reelInput):this.storage.update(reelInput);
    this.router.navigate(['/']);
  }
  }
}
