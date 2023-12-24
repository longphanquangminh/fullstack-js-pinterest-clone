import { Column, Entity, Index } from 'typeorm';

@Index('HELP_TOPIC_SEQ', ['topic', 'seq'], { unique: true })
@Entity('HELP')
export class Help {
  @Column('varchar2', { primary: true, name: 'TOPIC', length: 50 })
  topic: string;

  @Column('number', { primary: true, name: 'SEQ' })
  seq: number;

  @Column('varchar2', { name: 'INFO', nullable: true, length: 80 })
  info: string | null;
}
