import { Column, Entity } from 'typeorm';

@Entity('MVIEW$_ADV_PLAN')
export class MviewAdvPlan {
  @Column('date', { name: 'TIMESTAMP', nullable: true })
  timestamp: Date | null;

  @Column('number', { name: 'TEMP_SPACE', nullable: true, scale: 0 })
  tempSpace: number | null;

  @Column('varchar2', { name: 'STATEMENT_ID', nullable: true, length: 30 })
  statementId: string | null;

  @Column('number', { name: 'SEARCH_COLUMNS', nullable: true })
  searchColumns: number | null;

  @Column('varchar2', { name: 'REMARKS', nullable: true, length: 80 })
  remarks: string | null;

  @Column('number', { name: 'POSITION', nullable: true, scale: 0 })
  position: number | null;

  @Column('varchar2', { name: 'PARTITION_STOP', nullable: true, length: 255 })
  partitionStop: string | null;

  @Column('varchar2', { name: 'PARTITION_START', nullable: true, length: 255 })
  partitionStart: string | null;

  @Column('number', { name: 'PARTITION_ID', nullable: true, scale: 0 })
  partitionId: number | null;

  @Column('number', { name: 'PARENT_ID', nullable: true, scale: 0 })
  parentId: number | null;

  @Column('varchar2', { name: 'OTHER_TAG', nullable: true, length: 255 })
  otherTag: string | null;

  @Column('varchar2', { name: 'OPTIONS', nullable: true, length: 255 })
  options: string | null;

  @Column('varchar2', { name: 'OPTIMIZER', nullable: true, length: 255 })
  optimizer: string | null;

  @Column('varchar2', { name: 'OPERATION', nullable: true, length: 30 })
  operation: string | null;

  @Column('varchar2', { name: 'OBJECT_TYPE', nullable: true, length: 30 })
  objectType: string | null;

  @Column('varchar2', { name: 'OBJECT_OWNER', nullable: true, length: 128 })
  objectOwner: string | null;

  @Column('varchar2', { name: 'OBJECT_NODE', nullable: true, length: 128 })
  objectNode: string | null;

  @Column('varchar2', { name: 'OBJECT_NAME', nullable: true, length: 128 })
  objectName: string | null;

  @Column('number', { name: 'OBJECT_INSTANCE', nullable: true, scale: 0 })
  objectInstance: number | null;

  @Column('number', { name: 'IO_COST', nullable: true, scale: 0 })
  ioCost: number | null;

  @Column('number', { name: 'ID', nullable: true, scale: 0 })
  id: number | null;

  @Column('varchar2', { name: 'DISTRIBUTION', nullable: true, length: 30 })
  distribution: string | null;

  @Column('number', { name: 'CPU_COST', nullable: true, scale: 0 })
  cpuCost: number | null;

  @Column('number', { name: 'COST', nullable: true, scale: 0 })
  cost: number | null;

  @Column('number', { name: 'CARDINALITY', nullable: true, scale: 0 })
  cardinality: number | null;

  @Column('number', { name: 'BYTES', nullable: true, scale: 0 })
  bytes: number | null;

  @Column('long', { name: 'OTHER', nullable: true })
  other: string | null;
}
