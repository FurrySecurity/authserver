import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class InviteEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    key: string;

    @Column()
    redeemed: boolean;

    @Column()
    redeemer_id: number;
}