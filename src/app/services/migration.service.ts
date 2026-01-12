import { Injectable } from '@angular/core';
import { db, Reel } from '../models/db.model';

@Injectable({ providedIn: 'root' })
export class MigrationService {

  async migrateLocalStorageToDexie() {
    // const migrated = localStorage.getItem("reels_migrated");

    // // Prevent running twice
    // if (migrated === "true") {
    //   return;
    // }

    const raw = localStorage.getItem("saved_reels");

    if (!raw) {
      localStorage.setItem("reels_migrated", "true");
      return;
    }

    try {
      const reels: Reel[] = JSON.parse(raw);

      if (!Array.isArray(reels)) return;

      // Save into Dexie
      const result=await db.reels.bulkPut(reels);

      // Optional: remove old data
     // localStorage.removeItem("reels");

      // Mark as done
      //localStorage.setItem("reels_migrated", "true");

      console.log("✅ LocalStorage → IndexedDB migration completed");

    } catch (err) {
      console.error("❌ Migration failed", err);
    }
  }
}
