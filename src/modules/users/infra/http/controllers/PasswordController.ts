import { Request, Response } from 'express';
import { container } from 'tsyringe';

import SendEmailForgotPasswordService from '@modules/users/services/SendEmailForgotPasswordService';
import ResetPasswordService from '@modules/users/services/ResetPasswordService';

class PasswordController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { email } = req.body;

    const sendEmailForgotPassword = container.resolve(
      SendEmailForgotPasswordService,
    );

    await sendEmailForgotPassword.execute({
      email,
    });

    return res.status(204).send();
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { token, password } = req.body;

    const resetPassword = container.resolve(ResetPasswordService);

    await resetPassword.execute({
      token,
      password,
    });

    return res.status(204).send();
  }
}

export default PasswordController;
