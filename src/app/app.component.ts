import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-root',
  template: `
    <div *ngIf="sharedMessage" class="shared-message">
      <p>{{ sharedMessage }}</p>
      <button (click)="clearMessage()">Close</button>
    </div>
    <router-outlet></router-outlet>
  `,
  styles: [`
    .shared-message {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      background: #f0f0f0;
      padding: 10px;
      border-bottom: 1px solid #ccc;
      z-index: 1000;
    }
  `],
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
          this.sharedMessage = `Shared Instagram content: ${sharedText}`;
          setTimeout(() => {
            this.router.navigate(['/add'], {
              queryParams: { reelUrl: sharedText }
            });
            this.clearMessage();
          }, 2000); // Show for 2 seconds then navigate
        } else {
          // Handle other shared content, e.g., display it
          this.sharedMessage = `Shared content: ${JSON.stringify(params)}`;
        }
      }
    });
  }

  clearMessage() {
    this.sharedMessage = null;
  }
}
