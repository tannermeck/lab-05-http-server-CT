

const publicRoute = {
  async get(req, res) {
    const [, path] = req.url.split('/');
    if (path === '/' && req.method === 'GET'){
      res.statusCode = 200;
    }
    
  } 
};
export default publicRoute;

