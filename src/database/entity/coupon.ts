import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class CouponEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    key: string;

    @Column()
    credits: number;

    @Column()
    redeemed: boolean;

    @Column()
    redeemer_id: number; // UID of redeemer 
}