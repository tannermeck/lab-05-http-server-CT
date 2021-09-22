import { readFile } from 'fs/promises';
import path from 'path';

const rootDir = './public';
export const app = async (req, res) => {
  const [, resource, file] = req.url.split('/');
  if (req.url === '/' && req.method === 'GET'){ 
    try {
      const indexFile = 'index.html';
      const join = await path.join(rootDir, indexFile);
      const preParse = await readFile(join, 'utf-8');
      res.setHeader('Content-Type', 'text/html');
      res.end(preParse);
    } catch (error) {
      res.statusCode = 500;
      res.end(error.message);
    }
    
  } else if (resource === 'styles' && file === 'main.css' && req.method === 'GET'){
    try {
      const cssFile = 'css/main.css';
      const join = await path.join(rootDir, cssFile);
      const preParse = await readFile(join, 'utf-8');
      res.setHeader('Content-Type', 'text/plain');
      res.end(preParse);
    } catch (error){
      res.statusCode = 500;
      res.end(error.message);
    }
  } else {
    res.statusCode = 404;
    res.end('Not Found');
  }
};

export const parser = (req) => {
  if (req.method === 'POST' || req.method === 'PUT' || req.method === 'PATCH'){
    return new Promise((resolve, reject) => {
      if (req.contentType !== 'application/json'){
        reject('error');  
        return;         
      }        
      let data = '';
      req.on('data', (piece) => data += piece);
      req.on('end', () => {
        try {
          const parse = JSON.parse(data);
          resolve(parse);
        } catch {
          reject('Failure in parsing');
        }
      });
    });
  } else {
    return null;
  }
};
