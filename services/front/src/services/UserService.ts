import request from '../modules/request';

class UserService {
    private readonly URL = 'http://localhost:8080/auth';

    public async checkSession() {
        return await request(`${this.URL}/session`);
    }

    public async signIn(login: string, password: string) {
        const user = { login, password };

        await request(`${this.URL}/signin`, 'POST', user);
    }

    public async signUp(login: string, password: string) {
        const user = { login, password };

        await request(`${this.URL}/signup`, 'POST', user);
    }

    public async signOut() {
        await request(`${this.URL}/session`, 'DELETE');
    }
}

const userService = new UserService();

export default userService;
