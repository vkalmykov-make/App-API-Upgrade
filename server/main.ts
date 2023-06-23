
//import swaggerUi from 'swagger-ui-express';
import express from 'express'
import "dotenv/config";


(async () => {

    const dbPort = process.env.DB_PORT || 8080;
    const instance = express();

    // Routes and middleware 
    instance.get('/', (req, res) => {
        res.send('Hello, world!');
    });

    try {
        instance.listen(dbPort, () => {
          console.log(`Server started on port ${dbPort}`);
        });  
      } catch (err) {
        console.error(err);
      }
})();
