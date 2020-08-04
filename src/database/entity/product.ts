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
    developer: string;
    
    @Column()
    status: number;

    @Column()
    subscription: boolean;
}