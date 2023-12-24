import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { MviewAdvLog } from './MviewAdvLog';
import { MviewAdvFjg } from './MviewAdvFjg';

@Index('MVIEW$_ADV_AJG_PK', ['ajgid'], { unique: true })
@Entity('MVIEW$_ADV_AJG')
export class MviewAdvAjg {
  @Column('number', { name: 'HASHVALUE' })
  hashvalue: number;

  @Column('number', { name: 'FREQUENCY', nullable: true })
  frequency: number | null;

  @Column('number', { primary: true, name: 'AJGID#' })
  ajgid: number;

  @Column('number', { name: 'AJGDESLEN' })
  ajgdeslen: number;

  @Column('long raw', { name: 'AJGDES' })
  ajgdes: Buffer;

  @ManyToOne(() => MviewAdvLog, (mviewAdvLog) => mviewAdvLog.mviewAdvAjgs)
  @JoinColumn([{ name: 'RUNID#', referencedColumnName: 'runid' }])
  runid: MviewAdvLog;

  @OneToMany(() => MviewAdvFjg, (mviewAdvFjg) => mviewAdvFjg.ajgid)
  mviewAdvFjgs: MviewAdvFjg[];
}
