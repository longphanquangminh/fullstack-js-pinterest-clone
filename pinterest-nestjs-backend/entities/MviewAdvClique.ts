import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { MviewAdvLog } from './MviewAdvLog';

@Index('MVIEW$_ADV_CLIQUE_PK', ['cliqueid'], { unique: true })
@Entity('MVIEW$_ADV_CLIQUE')
export class MviewAdvClique {
  @Column('number', { name: 'ROWSIZE' })
  rowsize: number;

  @Column('number', { name: 'NUMROWS' })
  numrows: number;

  @Column('number', { name: 'HASHVALUE' })
  hashvalue: number;

  @Column('number', { name: 'FREQUENCY' })
  frequency: number;

  @Column('number', { primary: true, name: 'CLIQUEID#' })
  cliqueid: number;

  @Column('number', { name: 'CLIQUEDESLEN' })
  cliquedeslen: number;

  @Column('number', { name: 'BYTECOST' })
  bytecost: number;

  @Column('long raw', { name: 'CLIQUEDES' })
  cliquedes: Buffer;

  @ManyToOne(() => MviewAdvLog, (mviewAdvLog) => mviewAdvLog.mviewAdvCliques)
  @JoinColumn([{ name: 'RUNID#', referencedColumnName: 'runid' }])
  runid: MviewAdvLog;
}
