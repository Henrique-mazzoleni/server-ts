import { Response, Request, NextFunction } from 'express';
import { get, controller, use } from './decorators';

const requireAuth = (req: Request, res: Response, next: NextFunction): void => {
  if (req.session?.isLoggedIn) {
    next();
    return;
  }

  res.status(403).send('Not permitted');
};

@controller('')
class RootControler {
  @get('/')
  getRoot(req: Request, res: Response) {
    if (req.session?.isLoggedIn) {
      res.send(`
      <div>
        <h2>You are logged in</h2>
        <a href="/auth/logout">Log out</a>
      </div>
    `);
    } else {
      res.send(`
      <div>
        <h2>You are not logged in</h2>
        <a href="/auth/login">Log in</a>
      </div>
    `);
    }
  }

  @get('/protected')
  @use(requireAuth)
  getProtected(req: Request, res: Response) {
    res.send('Welcome to the protected route, logged user');
  }
}
