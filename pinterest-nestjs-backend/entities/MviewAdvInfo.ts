import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { MviewAdvLog } from './MviewAdvLog';

@Index('MVIEW$_ADV_INFO_PK', ['runid', 'seq'], { unique: true })
@Entity('MVIEW$_ADV_INFO')
export class MviewAdvInfo {
  @Column('number', { name: 'TYPE' })
  type: number;

  @Column('number', { name: 'STATUS', nullable: true })
  status: number | null;

  @Column('number', { primary: true, name: 'SEQ#' })
  seq: number;

  @Column('number', { primary: true, name: 'RUNID#' })
  runid: number;

  @Column('number', { name: 'INFOLEN' })
  infolen: number;

  @Column('number', { name: 'FLAG', nullable: true })
  flag: number | null;

  @Column('long raw', { name: 'INFO', nullable: true })
  info: Buffer | null;

  @ManyToOne(() => MviewAdvLog, (mviewAdvLog) => mviewAdvLog.mviewAdvInfos)
  @JoinColumn([{ name: 'RUNID#', referencedColumnName: 'runid' }])
  runid_2: MviewAdvLog;
}
