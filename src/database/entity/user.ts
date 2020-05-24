import { Entity, PrimaryGeneratedColumn, Column, OneToMany, getManager } from 'typeorm';

@Entity()
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    account_type: number;

    @Column()
    email: string;

    @Column()
    username: string;

    @Column()
    password: string;

    @Column()
    subscriptions: string; // json array

    @Column()
    credit: number;
}