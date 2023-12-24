import { Column, Entity, Index } from 'typeorm';

@Index('OL$HNT_NUM', ['olName', 'hint'], { unique: true })
@Entity('OL$HINTS')
export class OlHints {
  @Column('number', { name: 'STAGE#', nullable: true })
  stage: number | null;

  @Column('number', { name: 'HINT_TEXTLEN', nullable: true })
  hintTextlen: number | null;

  @Column('number', { name: 'SPARE2', nullable: true })
  spare2: number | null;

  @Column('clob', { name: 'HINT_STRING', nullable: true })
  hintString: string | null;

  @Column('varchar2', { name: 'OL_NAME', nullable: true, length: 128 })
  olName: string | null;

  @Column('varchar2', { name: 'USER_TABLE_NAME', nullable: true, length: 260 })
  userTableName: string | null;

  @Column('varchar2', { name: 'HINT_TEXT', nullable: true, length: 512 })
  hintText: string | null;

  @Column('number', { name: 'HINT_TYPE', nullable: true })
  hintType: number | null;

  @Column('number', { name: 'REF_ID', nullable: true })
  refId: number | null;

  @Column('number', { name: 'TABLE_TIN', nullable: true })
  tableTin: number | null;

  @Column('number', { name: 'NODE#', nullable: true })
  node: number | null;

  @Column('number', { name: 'SPARE1', nullable: true })
  spare1: number | null;

  @Column('varchar2', { name: 'TABLE_NAME', nullable: true, length: 128 })
  tableName: string | null;

  @Column('float', { name: 'BYTES', nullable: true, precision: 126 })
  bytes: number | null;

  @Column('number', { name: 'HINT_TEXTOFF', nullable: true })
  hintTextoff: number | null;

  @Column('varchar2', { name: 'CATEGORY', nullable: true, length: 128 })
  category: string | null;

  @Column('number', { name: 'TABLE_POS', nullable: true })
  tablePos: number | null;

  @Column('float', { name: 'COST', nullable: true, precision: 126 })
  cost: number | null;

  @Column('varchar2', { name: 'JOIN_PRED', nullable: true, length: 2000 })
  joinPred: string | null;

  @Column('number', { name: 'HINT#', nullable: true })
  hint: number | null;

  @Column('float', { name: 'CARDINALITY', nullable: true, precision: 126 })
  cardinality: number | null;
}
