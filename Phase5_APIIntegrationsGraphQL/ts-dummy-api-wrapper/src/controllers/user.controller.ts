import { Request, Response } from 'express';
import { Controller } from '../decorators/controller';
import { Get, Post, Put } from '../decorators/route';
import { UserService } from '../services/user.service';

@Controller('/users')
export class UserController {
  private userService = new UserService();

  @Get('/')
  async getUsers(req: Request, res: Response) {
    try {
      const users = await this.userService.getUsers();
      res.json(users);
    } catch (err: any) {
      res.status(500).json({ message: 'Failed to fetch users', error: err.message });
    }
  }

  @Get('/:id')
  async getUserById(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const user = await this.userService.getUserById(id);
      res.json(user);
    } catch (err: any) {
      res.status(500).json({ message: 'Failed to fetch user', error: err.message });
    }
  }

  @Post('/')
  async createUser(req: Request, res: Response) {
    try {
      const user = await this.userService.createUser(req.body);
      res.status(201).json(user);
    } catch (err: any) {
      res.status(500).json({ message: 'Failed to create user', error: err.message });
    }
  }

  @Put('/:id')
  async updateUser(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const user = await this.userService.updateUser(id, req.body);
      res.json(user);
    } catch (err: any) {
      res.status(500).json({ message: 'Failed to update user', error: err.message });
    }
  }
}
