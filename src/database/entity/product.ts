import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class ProductEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;
    
    @Column()
    description: string;

    @Column()
    buyable: boolean;

    @Column()
    price: number;

    @Column()
    subscription: boolean;

    @Column()
    expires: number;
}