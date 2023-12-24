import { Column, Entity } from 'typeorm';

@Entity('SCHEDULER_PROGRAM_ARGS_TBL')
export class SchedulerProgramArgsTbl {
  @Column('anydata', { name: 'DEFAULT_ANYDATA_VALUE', nullable: true })
  defaultAnydataValue: NonNullable<unknown> | null;

  @Column('varchar2', { name: 'PROGRAM_NAME', length: 128 })
  programName: string;

  @Column('varchar2', { name: 'OWNER', length: 128 })
  owner: string;

  @Column('varchar2', { name: 'OUT_ARGUMENT', nullable: true, length: 5 })
  outArgument: string | null;

  @Column('varchar2', {
    name: 'METADATA_ATTRIBUTE',
    nullable: true,
    length: 19,
  })
  metadataAttribute: string | null;

  @Column('varchar2', { name: 'DEFAULT_VALUE', nullable: true, length: 4000 })
  defaultValue: string | null;

  @Column('varchar2', { name: 'ARGUMENT_TYPE', nullable: true, length: 257 })
  argumentType: string | null;

  @Column('number', { name: 'ARGUMENT_POSITION' })
  argumentPosition: number;

  @Column('varchar2', { name: 'ARGUMENT_NAME', nullable: true, length: 128 })
  argumentName: string | null;
}
