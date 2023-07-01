import { Router, Response, Request, NextFunction } from 'express';

const router = Router();

interface RequestWithBody extends Request {
  body: { [key: string]: string | undefined };
}

const requireAuth = (req: Request, res: Response, next: NextFunction): void => {
  if (req.session?.isLoggedIn) {
    next();
    return;
  }

  res.status(403).send('Not permitted');
};

router.get('/login', (req: Request, res: Response) => {
  res.send(`
    <form method="POST">
      <div>
        <label for="email">Email</label>
        <input type="text" id="email" name="email" />
      </div>
      <div>
        <label for="password">Password</label>
        <input type="password" id="password" name="password" />
      </div>
      <button type="submit">Submit</button>
    </form>
  `);
});

router.post('/login', (req: RequestWithBody, res: Response) => {
  const { email, password } = req.body;

  if (email && password && email === 'hey@you.com' && password === 'pass') {
    req.session = { isLoggedIn: true };
    res.redirect('/');
  } else {
    res.send('Invalid email or password');
  }
});

router.get('/', (req: Request, res: Response) => {
  if (req.session?.isLoggedIn) {
    res.send(`
      <div>
        <h2>You are logged in</h2>
        <a href="/logout">Log out</a>
      </div>
    `);
  } else {
    res.send(`
      <div>
        <h2>You are not logged in</h2>
        <a href="/login">Log in</a>
      </div>
    `);
  }
});

router.get('/logout', (req: Request, res: Response) => {
  req.session = undefined;
  res.redirect('/');
});

router.get('/protected', requireAuth, (req: Request, res: Response) => {
  res.send('Welcome to the protected route, logged user');
});

export { router };
