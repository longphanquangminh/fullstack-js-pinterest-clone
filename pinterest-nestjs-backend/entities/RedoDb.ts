import { Column, Entity, Index } from 'typeorm';

@Index(
  'REDO_DB_IDX',
  ['tenantKey', 'dbid', 'thread', 'resetlogsScn', 'resetlogsTime'],
  {},
)
@Entity('REDO_DB')
export class RedoDb {
  @Column('varchar2', { name: 'VERSION', nullable: true, length: 32 })
  version: string | null;

  @Column('number', { name: 'TS3', nullable: true })
  ts3: number | null;

  @Column('number', { name: 'TS2', nullable: true })
  ts2: number | null;

  @Column('number', { name: 'TS1', nullable: true })
  ts1: number | null;

  @Column('number', { name: 'THREAD#' })
  thread: number;

  @Column('number', { name: 'TENANT_KEY' })
  tenantKey: number;

  @Column('number', { name: 'STATUS', nullable: true })
  status: number | null;

  @Column('number', { name: 'SPARE9', nullable: true })
  spare9: number | null;

  @Column('number', { name: 'SPARE8', nullable: true })
  spare8: number | null;

  @Column('varchar2', { name: 'SPARE7', nullable: true, length: 129 })
  spare7: string | null;

  @Column('varchar2', { name: 'SPARE6', nullable: true, length: 65 })
  spare6: string | null;

  @Column('date', { name: 'SPARE5', nullable: true })
  spare5: Date | null;

  @Column('number', { name: 'SPARE4', nullable: true })
  spare4: number | null;

  @Column('number', { name: 'SPARE12', nullable: true })
  spare12: number | null;

  @Column('number', { name: 'SPARE11', nullable: true })
  spare11: number | null;

  @Column('number', { name: 'SPARE10', nullable: true })
  spare10: number | null;

  @Column('number', { name: 'SEQNO_RCV_LO', nullable: true })
  seqnoRcvLo: number | null;

  @Column('number', { name: 'SEQNO_RCV_HI', nullable: true })
  seqnoRcvHi: number | null;

  @Column('number', { name: 'SEQNO_RCV_CUR', nullable: true })
  seqnoRcvCur: number | null;

  @Column('number', { name: 'SEQNO_DONE_LO', nullable: true })
  seqnoDoneLo: number | null;

  @Column('number', { name: 'SEQNO_DONE_HI', nullable: true })
  seqnoDoneHi: number | null;

  @Column('number', { name: 'SEQNO_DONE_CUR', nullable: true })
  seqnoDoneCur: number | null;

  @Column('number', { name: 'RESETLOGS_TIME' })
  resetlogsTime: number;

  @Column('number', { name: 'RESETLOGS_SCN_WRP', nullable: true })
  resetlogsScnWrp: number | null;

  @Column('number', { name: 'RESETLOGS_SCN_BAS', nullable: true })
  resetlogsScnBas: number | null;

  @Column('number', { name: 'RESETLOGS_SCN' })
  resetlogsScn: number;

  @Column('number', { name: 'PURGE_DONE', nullable: true })
  purgeDone: number | null;

  @Column('number', { name: 'PRESETLOGS_TIME' })
  presetlogsTime: number;

  @Column('number', { name: 'PRESETLOGS_SCN_WRP', nullable: true })
  presetlogsScnWrp: number | null;

  @Column('number', { name: 'PRESETLOGS_SCN_BAS', nullable: true })
  presetlogsScnBas: number | null;

  @Column('number', { name: 'PRESETLOGS_SCN' })
  presetlogsScn: number;

  @Column('number', { name: 'HAS_CHILD', nullable: true })
  hasChild: number | null;

  @Column('varchar2', { name: 'GLOBAL_DBNAME', nullable: true, length: 129 })
  globalDbname: string | null;

  @Column('number', { name: 'GAP_SEQNO', nullable: true })
  gapSeqno: number | null;

  @Column('number', { name: 'GAP_RET2', nullable: true })
  gapRet2: number | null;

  @Column('number', { name: 'GAP_RET', nullable: true })
  gapRet: number | null;

  @Column('number', { name: 'GAP_NEXT_TIME', nullable: true })
  gapNextTime: number | null;

  @Column('number', { name: 'GAP_NEXT_SCN', nullable: true })
  gapNextScn: number | null;

  @Column('number', { name: 'GAP_DONE', nullable: true })
  gapDone: number | null;

  @Column('number', { name: 'ERROR1', nullable: true })
  error1: number | null;

  @Column('number', { name: 'ENQIDX', nullable: true })
  enqidx: number | null;

  @Column('number', { name: 'ENDIAN', nullable: true })
  endian: number | null;

  @Column('varchar2', { name: 'DBUNAME', nullable: true, length: 32 })
  dbuname: string | null;

  @Column('number', { name: 'DBID' })
  dbid: number;

  @Column('number', { name: 'CURSCN_TIME', nullable: true })
  curscnTime: number | null;

  @Column('number', { name: 'CURLOG', nullable: true })
  curlog: number | null;

  @Column('number', { name: 'CURBLKNO', nullable: true })
  curblkno: number | null;

  @Column('date', { name: 'CREATE_DATE', nullable: true })
  createDate: Date | null;

  @Column('number', { name: 'APPLY_SEQNO', nullable: true })
  applySeqno: number | null;

  @Column('number', { name: 'APPLY_DONE', nullable: true })
  applyDone: number | null;
}
