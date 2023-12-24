import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { MviewAdvLog } from './MviewAdvLog';

@Entity('MVIEW$_ADV_FILTERINSTANCE')
export class MviewAdvFilterinstance {
  @Column('number', { name: 'SUBFILTERTYPE', nullable: true })
  subfiltertype: number | null;

  @Column('number', { name: 'SUBFILTERNUM#', nullable: true })
  subfilternum: number | null;

  @Column('varchar2', { name: 'STR_VALUE', nullable: true, length: 1028 })
  strValue: string | null;

  @Column('number', { name: 'NUM_VALUE2', nullable: true })
  numValue2: number | null;

  @Column('number', { name: 'NUM_VALUE1', nullable: true })
  numValue1: number | null;

  @Column('number', { name: 'FILTERID#', nullable: true })
  filterid: number | null;

  @Column('date', { name: 'DATE_VALUE2', nullable: true })
  dateValue2: Date | null;

  @Column('date', { name: 'DATE_VALUE1', nullable: true })
  dateValue1: Date | null;

  @ManyToOne(
    () => MviewAdvLog,
    (mviewAdvLog) => mviewAdvLog.mviewAdvFilterinstances,
  )
  @JoinColumn([{ name: 'RUNID#', referencedColumnName: 'runid' }])
  runid: MviewAdvLog;
}
