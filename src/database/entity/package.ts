import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

import { ProductEntity } from './product';

@Entity()
export class PackageEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    product_id: number;

    @Column()
    buyable: boolean;

    @Column()
    price: number;

    @Column()
    expires: number;
}