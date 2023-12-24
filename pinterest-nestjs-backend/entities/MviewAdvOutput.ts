import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { MviewAdvLog } from './MviewAdvLog';

@Index('MVIEW$_ADV_OUTPUT_PK', ['runid', 'rank'], { unique: true })
@Entity('MVIEW$_ADV_OUTPUT')
export class MviewAdvOutput {
  @Column('varchar2', { name: 'WHERE_CLAUSE', nullable: true, length: 2000 })
  whereClause: string | null;

  @Column('number', { name: 'VALIDATED', nullable: true })
  validated: number | null;

  @Column('varchar2', { name: 'SUMMARY_OWNER', nullable: true, length: 128 })
  summaryOwner: string | null;

  @Column('varchar2', { name: 'SUMMARY_NAME', nullable: true, length: 128 })
  summaryName: string | null;

  @Column('number', { name: 'STORAGE_IN_BYTES', nullable: true })
  storageInBytes: number | null;

  @Column('number', { primary: true, name: 'RUNID#' })
  runid: number;

  @Column('number', { primary: true, name: 'RANK#' })
  rank: number;

  @Column('number', { name: 'QUERYLEN', nullable: true })
  querylen: number | null;

  @Column('number', { name: 'PCT_PERFORMANCE_GAIN', nullable: true })
  pctPerformanceGain: number | null;

  @Column('number', { name: 'OUTPUT_TYPE' })
  outputType: number;

  @Column('varchar2', { name: 'MEASURES_LIST', nullable: true, length: 2000 })
  measuresList: string | null;

  @Column('varchar2', {
    name: 'GROUP_BY_COLUMNS',
    nullable: true,
    length: 2000,
  })
  groupByColumns: string | null;

  @Column('varchar2', { name: 'GROUPING_LEVELS', nullable: true, length: 2000 })
  groupingLevels: string | null;

  @Column('varchar2', { name: 'FROM_CLAUSE', nullable: true, length: 2000 })
  fromClause: string | null;

  @Column('number', { name: 'FREQUENCY', nullable: true })
  frequency: number | null;

  @Column('varchar2', { name: 'FACT_TABLES', nullable: true, length: 1000 })
  factTables: string | null;

  @Column('number', { name: 'CUMULATIVE_BENEFIT', nullable: true })
  cumulativeBenefit: number | null;

  @Column('number', { name: 'BENEFIT_TO_COST_RATIO' })
  benefitToCostRatio: number;

  @Column('varchar2', { name: 'ACTION_TYPE', nullable: true, length: 6 })
  actionType: string | null;

  @Column('long', { name: 'QUERY_TEXT', nullable: true })
  queryText: string | null;

  @ManyToOne(() => MviewAdvLog, (mviewAdvLog) => mviewAdvLog.mviewAdvOutputs)
  @JoinColumn([{ name: 'RUNID#', referencedColumnName: 'runid' }])
  runid_2: MviewAdvLog;
}
