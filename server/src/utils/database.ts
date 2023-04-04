import sqlite3 from 'sqlite3';
import { Database, open } from 'sqlite';
import path from 'path';
import { initialQuery } from './queries';

const dbPath = path.resolve(__dirname, '..', 'data', 'database.sqlite');
let db: Database;

export async function connect() {
  db = await open({
    filename: dbPath,
    driver: sqlite3.Database,
  });
  await db.exec(initialQuery);
  return db;
}

export function getDb(): Database {
  if (!db) {
    throw new Error('Database not initialized');
  }
  return db;
}

export async function db_all(query: string, params?: any[]): Promise<any[]> {
  const db = await connect();

  return db.all(query, params, function(err: any,rows: any){
      if(err){
        throw new Error(err);
      }
      db.close();
    });
}


export async function close() {
  if (db) {
    await db.close();
    console.log('Database connection closed');
  }
}