import { Response, Request } from 'express';
import { get, controller } from './decorators';

@controller('/auth')
class LoginController {
  @get('/login')
  getLogin(req: Request, res: Response): void {
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
  }
}
