import * as express from "express";
import * as bodyParser from "body-parser";
import { Request, Response } from "express";
import { AppDataSource } from "./data-source";
import { Routes } from "./routes";
import rootRoute from "./routes/rootRoute";

const LISTEN_PORT = 8080;

AppDataSource.initialize()
  .then(async () => {
    // create express app
    const app = express();
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(express.static("."));
    // app.use(rootRoute);
    // app.use(bodyParser.urlencoded({ extended: true }));
    // // cors
    // app.use((req, res, next) => {
    //   res.header("Access-Control-Allow-Origin", "*");
    //   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    //   next();
    // });

    // register express routes from defined application routes
    // Routes.forEach(route => {
    //   const controllers = new (route.controller as any)();
    //   const routeHandler = controllers[route.action].bind(controllers);

    //   // Apply middleware for specific routes
    //   if (route.middleware) {
    //     app[route.method](route.route, route.middleware, routeHandler);
    //   } else {
    //     app[route.method](route.route, routeHandler);
    //   }
    // });

    // Routes.forEach(route => {
    //   const controllers = new (route.controller as any)();
    //   const routeHandler = controllers[route.action].bind(controllers);

    //   // Apply multiple middlewares for specific routes
    //   const middlewares = Array.isArray(route.middleware) ? route.middleware : [route.middleware];
    //   app[route.method](route.route, middlewares, routeHandler);
    // });

    Routes.forEach(route => {
      const controllers = new (route.controller as any)();
      const routeHandler = controllers[route.action].bind(controllers);
      if (route.middleware) {
        const middlewares = Array.isArray(route.middleware) ? route.middleware : [route.middleware];
        app[route.method](route.route, middlewares, routeHandler);
      } else {
        app[route.method](route.route, routeHandler);
      }
    });

    // setup express app here
    // ...

    // start express server
    app.listen(LISTEN_PORT);

    // insert new users for test
    // await AppDataSource.manager.save(
    //   AppDataSource.manager.create(User, {
    //     firstName: "Timber",
    //     lastName: "Saw",
    //     age: 27,
    //   }),
    // );

    // await AppDataSource.manager.save(
    //   AppDataSource.manager.create(User, {
    //     firstName: "Phantom",
    //     lastName: "Assassin",
    //     age: 24,
    //   }),
    // );

    // console.log(`Express server has started on port ${LISTEN_PORT}. Open http://localhost:${LISTEN_PORT}/users to see results`);
    console.log(`Express server has started on port ${LISTEN_PORT}`);
  })
  .catch(error => console.log(error));
