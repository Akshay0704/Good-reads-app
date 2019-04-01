// const goodreads = require('goodreads-api-node');
import { goodreads } from 'goodreads-api-node';

const myCredentials = {
    key: 'p8THuaYBkNwM725o0MZvA',
    secret: 'i8b9WCsBRWUyzrXkLPnaGdXEFB5nVSAY075uzqfdg'
  };
   
export const gr = goodreads(myCredentials);