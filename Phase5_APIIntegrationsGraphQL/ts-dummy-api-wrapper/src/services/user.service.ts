import axios from 'axios';
import { User } from '../types/user.types';

export class UserService {
  private baseUrl = 'https://jsonplaceholder.typicode.com';

  async getUsers() {
    const response = await axios.get<User[]>(`${this.baseUrl}/users`);

    // Transform & sanitize
    return response.data.map(user => ({
      id: user.id,
      name: user.name,
      username: user.username,
      email: user.email,
      phone: user.phone,
      website: user.website
    }));
  }

  async getUserById(id: number) {
    const response = await axios.get<User>(`${this.baseUrl}/users/${id}`);
    const user = response.data;

    return {
      id: user.id,
      name: user.name,
      username: user.username,
      email: user.email,
      phone: user.phone,
      website: user.website
    };
  }

  async createUser(user: Partial<User>) {
    const response = await axios.post<User>(`${this.baseUrl}/users`, user);
    console.log('user:', user);
    return response.data;

  }

  async updateUser(id: number, user: Partial<User>) {
    const response = await axios.put<User>(`${this.baseUrl}/users/${id}`, user);
    return response.data;
  }

}
