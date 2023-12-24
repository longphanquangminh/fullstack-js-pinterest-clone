import { Column, Entity, Index, OneToMany } from 'typeorm';
import { MviewAdvBasetable } from './MviewAdvBasetable';

@Index('MVIEW$_ADV_WORKLOAD_IDX_01', ['collectionid', 'queryid'], {})
@Index('MVIEW$_ADV_WORKLOAD_PK', ['queryid'], { unique: true })
@Entity('MVIEW$_ADV_WORKLOAD')
export class MviewAdvWorkload {
  @Column('varchar2', { name: 'UNAME', length: 128 })
  uname: string;

  @Column('number', { name: 'SQL_TEXTLEN' })
  sqlTextlen: number;

  @Column('number', { name: 'SQL_HASH', nullable: true })
  sqlHash: number | null;

  @Column('raw', { name: 'SQL_ADDR', nullable: true, length: 16 })
  sqlAddr: Buffer | null;

  @Column('number', { name: 'RESULTSIZE', nullable: true })
  resultsize: number | null;

  @Column('number', { primary: true, name: 'QUERYID#' })
  queryid: number;

  @Column('date', { name: 'QDATE', nullable: true })
  qdate: Date | null;

  @Column('number', { name: 'PRIORITY', nullable: true })
  priority: number | null;

  @Column('number', { name: 'FREQUENCY', nullable: true })
  frequency: number | null;

  @Column('number', { name: 'EXEC_TIME', nullable: true })
  execTime: number | null;

  @Column('date', { name: 'COLLECTTIME' })
  collecttime: Date;

  @Column('number', { name: 'COLLECTIONID#' })
  collectionid: number;

  @Column('number', { name: 'CARDINALITY', nullable: true })
  cardinality: number | null;

  @Column('varchar2', { name: 'APPLICATION', nullable: true, length: 128 })
  application: string | null;

  @Column('long', { name: 'SQL_TEXT' })
  sqlText: string;

  @OneToMany(
    () => MviewAdvBasetable,
    (mviewAdvBasetable) => mviewAdvBasetable.queryid_2,
  )
  mviewAdvBasetables: MviewAdvBasetable[];
}
