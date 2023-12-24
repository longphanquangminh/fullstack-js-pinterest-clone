import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { MviewAdvLog } from './MviewAdvLog';
import { MviewAdvRollup } from './MviewAdvRollup';

@Index('MVIEW$_ADV_LEVEL_PK', ['runid', 'levelid'], { unique: true })
@Entity('MVIEW$_ADV_LEVEL')
export class MviewAdvLevel {
  @Column('number', { name: 'TBLOBJ#' })
  tblobj: number;

  @Column('number', { primary: true, name: 'RUNID#' })
  runid: number;

  @Column('varchar2', { name: 'LEVELNAME', nullable: true, length: 128 })
  levelname: string | null;

  @Column('number', { primary: true, name: 'LEVELID#' })
  levelid: number;

  @Column('number', { name: 'FLAGS' })
  flags: number;

  @Column('number', { name: 'DIMOBJ#', nullable: true })
  dimobj: number | null;

  @Column('raw', { name: 'COLUMNLIST', length: 70 })
  columnlist: Buffer;

  @ManyToOne(() => MviewAdvLog, (mviewAdvLog) => mviewAdvLog.mviewAdvLevels)
  @JoinColumn([{ name: 'RUNID#', referencedColumnName: 'runid' }])
  runid_2: MviewAdvLog;

  @OneToMany(
    () => MviewAdvRollup,
    (mviewAdvRollup) => mviewAdvRollup.mviewAdvLevel,
  )
  mviewAdvRollups: MviewAdvRollup[];

  @OneToMany(
    () => MviewAdvRollup,
    (mviewAdvRollup) => mviewAdvRollup.mviewAdvLevel2,
  )
  mviewAdvRollups2: MviewAdvRollup[];
}
