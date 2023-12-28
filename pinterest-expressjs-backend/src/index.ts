import * as express from "express";
import * as bodyParser from "body-parser";
import * as cors from "cors";
import { AppDataSource } from "./data-source";
import { Routes } from "./routes";

const LISTEN_PORT = 8080;

AppDataSource.initialize()
  .then(async () => {
    const app = express();
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(express.static("."));
    app.use(cors());

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

    app.listen(LISTEN_PORT);
    console.log(`Express server has started on port ${LISTEN_PORT}`);
  })
  .catch(error => console.log(error));
