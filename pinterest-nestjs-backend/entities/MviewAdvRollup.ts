import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { MviewAdvLevel } from './MviewAdvLevel';
import { MviewAdvLog } from './MviewAdvLog';

@Index('MVIEW$_ADV_ROLLUP_PK', ['runid', 'clevelid', 'plevelid'], {
  unique: true,
})
@Entity('MVIEW$_ADV_ROLLUP')
export class MviewAdvRollup {
  @Column('number', { primary: true, name: 'RUNID#' })
  runid: number;

  @Column('number', { primary: true, name: 'PLEVELID#' })
  plevelid: number;

  @Column('number', { name: 'FLAGS' })
  flags: number;

  @Column('number', { primary: true, name: 'CLEVELID#' })
  clevelid: number;

  @ManyToOne(
    () => MviewAdvLevel,
    (mviewAdvLevel) => mviewAdvLevel.mviewAdvRollups,
  )
  @JoinColumn([
    { name: 'RUNID#', referencedColumnName: 'runid' },
    { name: 'CLEVELID#', referencedColumnName: 'levelid' },
  ])
  mviewAdvLevel: MviewAdvLevel;

  @ManyToOne(() => MviewAdvLog, (mviewAdvLog) => mviewAdvLog.mviewAdvRollups)
  @JoinColumn([{ name: 'RUNID#', referencedColumnName: 'runid' }])
  runid_2: MviewAdvLog;

  @ManyToOne(
    () => MviewAdvLevel,
    (mviewAdvLevel) => mviewAdvLevel.mviewAdvRollups2,
  )
  @JoinColumn([
    { name: 'RUNID#', referencedColumnName: 'runid' },
    { name: 'PLEVELID#', referencedColumnName: 'levelid' },
  ])
  mviewAdvLevel2: MviewAdvLevel;
}
