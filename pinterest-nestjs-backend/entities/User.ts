import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user')
export class User {
  @Column('number', { name: 'age' })
  age: number;

  @Column('varchar2', { name: 'firstName', length: 255 })
  firstName: string;

  @Column('varchar2', { name: 'lastName', length: 255 })
  lastName: string;

  @PrimaryGeneratedColumn({ type: 'number', name: 'id' })
  id: number;
}
