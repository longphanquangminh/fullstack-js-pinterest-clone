import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { MviewAdvLog } from './MviewAdvLog';

@Entity('MVIEW$_ADV_EXCEPTIONS')
export class MviewAdvExceptions {
  @Column('varchar2', { name: 'TABLE_NAME', nullable: true, length: 128 })
  tableName: string | null;

  @Column('varchar2', { name: 'RELATIONSHIP', nullable: true, length: 11 })
  relationship: string | null;

  @Column('varchar2', { name: 'OWNER', nullable: true, length: 128 })
  owner: string | null;

  @Column('varchar2', { name: 'DIMENSION_NAME', nullable: true, length: 128 })
  dimensionName: string | null;

  @Column('rowid', { name: 'BAD_ROWID', nullable: true })
  badRowid: number | null;

  @ManyToOne(() => MviewAdvLog, (mviewAdvLog) => mviewAdvLog.mviewAdvExceptions)
  @JoinColumn([{ name: 'RUNID#', referencedColumnName: 'runid' }])
  runid: MviewAdvLog;
}
