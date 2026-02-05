import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinTable, ManyToMany, OneToOne } from "typeorm";
import { Post } from "./post";
import { Group } from "./groups";
import { Profile } from "./profile";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @OneToOne(() => Profile, profile => profile.user, { cascade: true })
    profile!: Profile;

    @OneToMany(() => Post, post => post.user)
    posts!: Post[];

    @ManyToMany(() => Group, group => group.users)
    @JoinTable()
    groups!: Group[]
}
