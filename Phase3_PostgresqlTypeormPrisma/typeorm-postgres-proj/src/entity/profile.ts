import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm";
import { User } from "./user";

@Entity()
export class Profile {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    bio!: string;

    @Column()
    avatarUrl!: string;

    @OneToOne(() => User, user => user.profile, { onDelete: "CASCADE" })
    @JoinColumn()
    user!: User;
}