import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Event {
    @PrimaryGeneratedColumn({type: "bigint"})
    id: number;

    @Column()
    userId: string

    @Column()
    eventName: string
}