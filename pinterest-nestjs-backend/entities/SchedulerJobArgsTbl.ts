import { Column, Entity } from 'typeorm';

@Entity('SCHEDULER_JOB_ARGS_TBL')
export class SchedulerJobArgsTbl {
  @Column('anydata', { name: 'ANYDATA_VALUE', nullable: true })
  anydataValue: NonNullable<unknown> | null;

  @Column('varchar2', { name: 'VALUE', nullable: true, length: 4000 })
  value: string | null;

  @Column('varchar2', { name: 'OWNER', nullable: true, length: 128 })
  owner: string | null;

  @Column('varchar2', { name: 'OUT_ARGUMENT', nullable: true, length: 5 })
  outArgument: string | null;

  @Column('varchar2', { name: 'JOB_NAME', nullable: true, length: 128 })
  jobName: string | null;

  @Column('varchar2', { name: 'ARGUMENT_TYPE', nullable: true, length: 257 })
  argumentType: string | null;

  @Column('number', { name: 'ARGUMENT_POSITION', nullable: true })
  argumentPosition: number | null;

  @Column('varchar2', { name: 'ARGUMENT_NAME', nullable: true, length: 128 })
  argumentName: string | null;
}
