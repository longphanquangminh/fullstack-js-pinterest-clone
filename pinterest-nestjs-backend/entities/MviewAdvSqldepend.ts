import { Column, Entity, Index } from 'typeorm';

@Index(
  'MVIEW$_ADV_SQLDEPEND_IDX_01',
  ['collectionid', 'fromAddress', 'fromHash', 'instId'],
  {},
)
@Entity('MVIEW$_ADV_SQLDEPEND')
export class MviewAdvSqldepend {
  @Column('number', { name: 'TO_TYPE', nullable: true })
  toType: number | null;

  @Column('varchar2', { name: 'TO_OWNER', nullable: true, length: 128 })
  toOwner: string | null;

  @Column('varchar2', { name: 'TO_NAME', nullable: true, length: 1000 })
  toName: string | null;

  @Column('number', { name: 'INST_ID', nullable: true })
  instId: number | null;

  @Column('number', { name: 'FROM_HASH', nullable: true })
  fromHash: number | null;

  @Column('raw', { name: 'FROM_ADDRESS', nullable: true, length: 16 })
  fromAddress: Buffer | null;

  @Column('number', { name: 'COLLECTIONID#', nullable: true })
  collectionid: number | null;

  @Column('number', { name: 'CARDINALITY', nullable: true })
  cardinality: number | null;
}
