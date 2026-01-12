import { Component, EventEmitter, Input, Output} from '@angular/core';
import { Router } from '@angular/router';
import { ReelStorageService } from '../../services/reel-storage.service';
import { Reel } from '../../models/db.model';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  @Input() isHidden:boolean = false;
  @Output() reel =new EventEmitter<string>();
constructor(private storage: ReelStorageService,private router: Router) {}
async search(v: string) {
     this.reel.emit(v);
  }

  /* 🌓 Dark Mode */
  toggleDarkMode() {
    document.body.classList.toggle('dark');
    localStorage.setItem(
      'dark',
      document.body.classList.contains('dark') ? '1' : '0'
    );
  }
}
