import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.error('putDb not implemented');

  // Connecting to the jate database
  const jateDb = await openDB('jate', 1);

  // Data will be changed in the jate databse so the "readwrite" parameter is used
  const tx = jateDb.transaction('jate', 'readwrite');

  // Will provide the jate object store
  const store = tx.objectStore('jate');

  // Will add content to the store 
  const request = store.add({ id: 1, value: content });

  // Upon receiving request, result will be returned
  const result = await request;
  console.log('Data added to database', result.value);
}; 


// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  
  console.error('getDb not implemented');

  // Connecting to the jate database
  const jateDb = await openDB('jate', 1);

  // Data will only be pulled from jate databse so the "readonly" parameter is used
  const tx = jateDb.transaction('jate', 'readonly');

  // Will pull the jate object store
  const store = tx.objectStore('jate');

  // Pulling all data in the database
  const request = store.getAll();

  // Upon receiving request, result will be returned
  const result = await request;
  console.log('result.value', result);
  return result.value;

};

initdb();
