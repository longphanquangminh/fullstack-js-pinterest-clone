import { Column, Entity, Index } from 'typeorm';

@Index(
  'REDO_LOG_IDX',
  ['tenantKey', 'dbid', 'thread', 'resetlogsScn', 'resetlogsTime'],
  {},
)
@Entity('REDO_LOG')
export class RedoLog {
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

  @Column('number', { name: 'STATUS2', nullable: true })
  status2: number | null;

  @Column('number', { name: 'STATUS1', nullable: true })
  status1: number | null;

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

  @Column('number', { name: 'SPARE3', nullable: true })
  spare3: number | null;

  @Column('number', { name: 'SPARE2', nullable: true })
  spare2: number | null;

  @Column('number', { name: 'SPARE10', nullable: true })
  spare10: number | null;

  @Column('number', { name: 'SEQUENCE#' })
  sequence: number;

  @Column('number', { name: 'RESETLOGS_TIME' })
  resetlogsTime: number;

  @Column('number', { name: 'RESETLOGS_SCN_WRP', nullable: true })
  resetlogsScnWrp: number | null;

  @Column('number', { name: 'RESETLOGS_SCN_BAS', nullable: true })
  resetlogsScnBas: number | null;

  @Column('number', { name: 'RESETLOGS_SCN' })
  resetlogsScn: number;

  @Column('number', { name: 'PRESETLOGS_TIME' })
  presetlogsTime: number;

  @Column('number', { name: 'PRESETLOGS_SCN_WRP', nullable: true })
  presetlogsScnWrp: number | null;

  @Column('number', { name: 'PRESETLOGS_SCN_BAS', nullable: true })
  presetlogsScnBas: number | null;

  @Column('number', { name: 'PRESETLOGS_SCN' })
  presetlogsScn: number;

  @Column('number', { name: 'OLD_STATUS2', nullable: true })
  oldStatus2: number | null;

  @Column('number', { name: 'OLD_STATUS1', nullable: true })
  oldStatus1: number | null;

  @Column('varchar2', { name: 'OLD_FILENAME', nullable: true, length: 513 })
  oldFilename: string | null;

  @Column('number', { name: 'OLD_BLOCKS', nullable: true })
  oldBlocks: number | null;

  @Column('number', { name: 'NEXT_TIME', nullable: true })
  nextTime: number | null;

  @Column('number', { name: 'NEXT_SCN_WRP', nullable: true })
  nextScnWrp: number | null;

  @Column('number', { name: 'NEXT_SCN_BAS', nullable: true })
  nextScnBas: number | null;

  @Column('number', { name: 'NEXT_SCN', nullable: true })
  nextScn: number | null;

  @Column('varchar2', { name: 'GLOBAL_DBNAME', nullable: true, length: 129 })
  globalDbname: string | null;

  @Column('number', { name: 'FIRST_TIME', nullable: true })
  firstTime: number | null;

  @Column('number', { name: 'FIRST_SCN_WRP', nullable: true })
  firstScnWrp: number | null;

  @Column('number', { name: 'FIRST_SCN_BAS', nullable: true })
  firstScnBas: number | null;

  @Column('number', { name: 'FIRST_SCN', nullable: true })
  firstScn: number | null;

  @Column('varchar2', { name: 'FILENAME', nullable: true, length: 513 })
  filename: string | null;

  @Column('number', { name: 'ERROR2', nullable: true })
  error2: number | null;

  @Column('number', { name: 'ERROR1', nullable: true })
  error1: number | null;

  @Column('number', { name: 'ENDIAN', nullable: true })
  endian: number | null;

  @Column('number', { name: 'DUPID', nullable: true })
  dupid: number | null;

  @Column('varchar2', { name: 'DONE_TIME', nullable: true, length: 32 })
  doneTime: string | null;

  @Column('varchar2', { name: 'DBUNAME', nullable: true, length: 32 })
  dbuname: string | null;

  @Column('number', { name: 'DBID' })
  dbid: number;

  @Column('varchar2', { name: 'CREATE_TIME', nullable: true, length: 32 })
  createTime: string | null;

  @Column('date', { name: 'CREATE_DATE', nullable: true })
  createDate: Date | null;

  @Column('varchar2', { name: 'CLOSE_TIME', nullable: true, length: 32 })
  closeTime: string | null;

  @Column('number', { name: 'BLOCK_SIZE', nullable: true })
  blockSize: number | null;

  @Column('number', { name: 'BLOCKS', nullable: true })
  blocks: number | null;
}
