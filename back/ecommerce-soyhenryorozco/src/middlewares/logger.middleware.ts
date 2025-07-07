// import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

// @Injectable()
// export class LoggerMiddleware implements NestMiddleware {
//   use(req: Request, res: Response, next: NextFunction) {
//     const getDate = (): string => new Date().toLocaleString();
//     console.log(
//       `Estas ejecutando un metodo ${req.method} en la ruta ${req.url} - Request time: ${getDate()}`,
//     );
//     next();
//   }
// }

export function loggerGlobal(req: Request, res: Response, next: NextFunction) {
  // console.log(`Estas ejecutando un metodo ${req.method} en la ruta ${req.url}`);
  const getDate = (): string => new Date().toLocaleString();
  console.log(
    `Estas ejecutando un metodo ${req.method} en la ruta ${req.url} - Request time: ${getDate()}`,
  );
  next();
}
