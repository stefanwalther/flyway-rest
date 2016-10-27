import { Router } from 'express';

export default ( config ) => {
  let routes = Router();

  console.log( 'config in middleware', config );

  routes.get('/', (req, res) => {
    res.send({message: 'Hello World!!'});
  });

  return routes;
}
