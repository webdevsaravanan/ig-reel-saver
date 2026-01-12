import Dexie, { Table } from 'dexie';

export interface Reel {
  id: string;
  title: string;
  hashtags: string[];
  reelUrl: string;
  createdAt: number;
  favorite?: boolean;
}

export class AppDB extends Dexie {
  reels!: Table<Reel, string>;

  constructor() {
    super('ReelsDB');

    this.version(1).stores({
      reels: 'id, createdAt, favorite,title,hashtags'   // primary key + index
    });
  }
}

export const db = new AppDB();
