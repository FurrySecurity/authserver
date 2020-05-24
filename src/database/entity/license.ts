import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class LicenseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    key: string;

    @Column()
    time: number;

    @Column()
    product_id: number;

    @Column()
    redeemer_id: number; // UUID of redeemer 
}