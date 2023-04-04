import sqlite3 from 'sqlite3';
import path from 'path';
import { getAllJotcRequest, insertJotcRequest } from '../utils/queries';

export const openDb = async () => {
  const dbPath = path.resolve(__dirname, '..', 'data', 'database.sqlite');
  const db = new sqlite3.Database(dbPath);

  return db;
};

export const jumpingOnTheClouds = (numbers: number[]) => {
  let jumps = 0;
  let idx = 0;
  let idxPath = []

  do{
    jumps++;
    idxPath.push(idx)
    idx = numbers[idx + 2] === 0 ? idx + 2 : idx + 1;
  } while(idx < numbers.length - 1)

  idxPath.push(idx);

  return { jumps, idxPath };
}

export const validateJotcInput = (numbers: number[]) => {
  const errors: string[] = [];

  if (numbers.length < 2 || numbers.length > 100) {
    errors.push("The number of elements must be between 2 and 100.");
  }

  if (numbers[0] !== 0) {
    errors.push("The first element must be 0.");
  }

  if (numbers[numbers.length - 1] !== 0) {
    errors.push("The last element must be 0.");
  }

  for (let i = 0; i < numbers.length; i++) {
    if (numbers[i] !== 0 && numbers[i] !== 1) {
      errors.push("All elements must be 0 or 1.");
      break;
    }
    if (numbers[i] === 1 && numbers[i+1] === 1 && numbers[i+2] === 1) {
      errors.push("Invalid input: impossible to finish.");
      break;
    }
  }

  return errors;
} 

export const saveJotcRequest = async (numbers: number[], email: string, result: number) => {
  let numbersString = numbers.join(",");
  const db = await openDb();
  
  const stmt = db.prepare(insertJotcRequest);

  stmt.run(email, numbersString, result);
  stmt.finalize();
  db.close();
}

async function db_all(query: string){
  const db = await openDb();
  return new Promise(function(resolve,reject){
      db.all(query, function(err,rows){
         if(err){return reject(err);}
         resolve(rows);
       });
  });
}

export const getAllJotcRequests = async () => {
  const jotcRequests = await db_all(getAllJotcRequest);
  
  return jotcRequests;
};

export default {
  jumpingOnTheClouds,
  saveJotcRequest,
  getAllJotcRequests,
};
