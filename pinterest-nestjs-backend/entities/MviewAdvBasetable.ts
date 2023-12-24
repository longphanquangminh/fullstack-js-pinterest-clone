import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { MviewAdvWorkload } from './MviewAdvWorkload';

@Index('MVIEW$_ADV_BASETABLE_IDX_01', ['queryid'], {})
@Entity('MVIEW$_ADV_BASETABLE')
export class MviewAdvBasetable {
  @Column('number', { name: 'TABLE_TYPE', nullable: true })
  tableType: number | null;

  @Column('varchar2', { name: 'TABLE_NAME', nullable: true, length: 128 })
  tableName: string | null;

  @Column('number', { name: 'QUERYID#' })
  queryid: number;

  @Column('varchar2', { name: 'OWNER', nullable: true, length: 128 })
  owner: string | null;

  @Column('number', { name: 'COLLECTIONID#' })
  collectionid: number;

  @ManyToOne(
    () => MviewAdvWorkload,
    (mviewAdvWorkload) => mviewAdvWorkload.mviewAdvBasetables,
  )
  @JoinColumn([{ name: 'QUERYID#', referencedColumnName: 'queryid' }])
  queryid_2: MviewAdvWorkload;
}
