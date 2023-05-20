import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Event {
    @PrimaryGeneratedColumn({type: "bigint"})
    id: number;

    @Column()
    accountId: string

    @Column()
    eventName: string
}