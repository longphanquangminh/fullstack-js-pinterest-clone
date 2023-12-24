import { Column, Entity, Index, OneToMany } from 'typeorm';
import { MviewAdvAjg } from './MviewAdvAjg';
import { MviewAdvClique } from './MviewAdvClique';
import { MviewAdvEligible } from './MviewAdvEligible';
import { MviewAdvExceptions } from './MviewAdvExceptions';
import { MviewAdvFilterinstance } from './MviewAdvFilterinstance';
import { MviewAdvInfo } from './MviewAdvInfo';
import { MviewAdvJournal } from './MviewAdvJournal';
import { MviewAdvLevel } from './MviewAdvLevel';
import { MviewAdvOutput } from './MviewAdvOutput';
import { MviewAdvRollup } from './MviewAdvRollup';

@Index('MVIEW$_ADV_LOG_PK', ['runid'], { unique: true })
@Entity('MVIEW$_ADV_LOG')
export class MviewAdvLog {
  @Column('varchar2', { name: 'UNAME', nullable: true, length: 128 })
  uname: string | null;

  @Column('number', { name: 'TOTAL', nullable: true })
  total: number | null;

  @Column('number', { name: 'STATUS' })
  status: number;

  @Column('number', { name: 'RUN_TYPE', nullable: true })
  runType: number | null;

  @Column('date', { name: 'RUN_END', nullable: true })
  runEnd: Date | null;

  @Column('date', { name: 'RUN_BEGIN', nullable: true })
  runBegin: Date | null;

  @Column('number', { primary: true, name: 'RUNID#' })
  runid: number;

  @Column('varchar2', { name: 'MESSAGE', nullable: true, length: 2000 })
  message: string | null;

  @Column('number', { name: 'FILTERID#', nullable: true })
  filterid: number | null;

  @Column('varchar2', { name: 'ERROR_CODE', nullable: true, length: 20 })
  errorCode: string | null;

  @Column('number', { name: 'COMPLETED', nullable: true })
  completed: number | null;

  @OneToMany(() => MviewAdvAjg, (mviewAdvAjg) => mviewAdvAjg.runid)
  mviewAdvAjgs: MviewAdvAjg[];

  @OneToMany(() => MviewAdvClique, (mviewAdvClique) => mviewAdvClique.runid)
  mviewAdvCliques: MviewAdvClique[];

  @OneToMany(
    () => MviewAdvEligible,
    (mviewAdvEligible) => mviewAdvEligible.runid_2,
  )
  mviewAdvEligibles: MviewAdvEligible[];

  @OneToMany(
    () => MviewAdvExceptions,
    (mviewAdvExceptions) => mviewAdvExceptions.runid,
  )
  mviewAdvExceptions: MviewAdvExceptions[];

  @OneToMany(
    () => MviewAdvFilterinstance,
    (mviewAdvFilterinstance) => mviewAdvFilterinstance.runid,
  )
  mviewAdvFilterinstances: MviewAdvFilterinstance[];

  @OneToMany(() => MviewAdvInfo, (mviewAdvInfo) => mviewAdvInfo.runid_2)
  mviewAdvInfos: MviewAdvInfo[];

  @OneToMany(
    () => MviewAdvJournal,
    (mviewAdvJournal) => mviewAdvJournal.runid_2,
  )
  mviewAdvJournals: MviewAdvJournal[];

  @OneToMany(() => MviewAdvLevel, (mviewAdvLevel) => mviewAdvLevel.runid_2)
  mviewAdvLevels: MviewAdvLevel[];

  @OneToMany(() => MviewAdvOutput, (mviewAdvOutput) => mviewAdvOutput.runid_2)
  mviewAdvOutputs: MviewAdvOutput[];

  @OneToMany(() => MviewAdvRollup, (mviewAdvRollup) => mviewAdvRollup.runid_2)
  mviewAdvRollups: MviewAdvRollup[];
}
