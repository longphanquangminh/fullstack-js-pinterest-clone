import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { MviewAdvLog } from './MviewAdvLog';

@Index('MVIEW$_ADV_JOURNAL_PK', ['runid', 'seq'], { unique: true })
@Entity('MVIEW$_ADV_JOURNAL')
export class MviewAdvJournal {
  @Column('date', { name: 'TIMESTAMP' })
  timestamp: Date;

  @Column('number', { name: 'TEXTLEN', nullable: true })
  textlen: number | null;

  @Column('number', { primary: true, name: 'SEQ#' })
  seq: number;

  @Column('number', { primary: true, name: 'RUNID#' })
  runid: number;

  @Column('number', { name: 'NUM', nullable: true })
  num: number | null;

  @Column('number', { name: 'FLAGS' })
  flags: number;

  @Column('long', { name: 'TEXT', nullable: true })
  text: string | null;

  @ManyToOne(() => MviewAdvLog, (mviewAdvLog) => mviewAdvLog.mviewAdvJournals)
  @JoinColumn([{ name: 'RUNID#', referencedColumnName: 'runid' }])
  runid_2: MviewAdvLog;
}
