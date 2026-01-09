import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
  standalone: false
})
export class AppComponent implements OnInit {
  sharedMessage: string | null = null;

  constructor(private router: Router, private route: ActivatedRoute) {}
  
  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const sharedText = params['text'] || params['url'] || params['android.intent.extra.TEXT'];
      if (sharedText) {
        console.log('Shared content received:', params);
        // Handle the shared content here
        // For example, if it's an Instagram URL, navigate to add page
        if (sharedText.includes('instagram.com')) {
          this.router.navigate(['/add'], {
            queryParams: { reelUrl: sharedText }
          });
        } else {
          // Handle other shared content, e.g., display it
         // this.sharedMessage = `Shared content: ${JSON.stringify(params)}`;
        }
      }
    });
  }
  clearMessage() {
    this.sharedMessage = null;
  }
}
