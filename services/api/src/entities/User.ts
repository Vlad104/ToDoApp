import bcrypt from 'bcrypt';
import { BeforeInsert, Column, Entity, PrimaryColumn, Unique } from 'typeorm';

const saltRounds = 10;

@Entity('users')
@Unique(['login'])
export class User {

    @PrimaryColumn()
    public login: string;

    @Column()
    public password: string;

    private async setPassword(newPassword: string) {
        this.password = await bcrypt.hash(newPassword, saltRounds);
    }

    @BeforeInsert()
    private async encryptPassword() {
        this.password = await bcrypt.hash(this.password, saltRounds);
    }
}
