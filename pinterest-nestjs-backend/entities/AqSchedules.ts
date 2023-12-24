import { Column, Entity, Index } from 'typeorm';

@Index('AQ$_SCHEDULES_CHECK', ['jobno'], { unique: true })
@Index('AQ$_SCHEDULES_PRIMARY', ['oid', 'destination'], { unique: true })
@Entity('AQ$_SCHEDULES')
export class AqSchedules {
  @Column('date', { name: 'START_TIME', nullable: true })
  startTime: Date | null;

  @Column('raw', { name: 'OID', length: 16 })
  oid: Buffer;

  @Column('varchar2', { name: 'NEXT_TIME', nullable: true, length: 128 })
  nextTime: string | null;

  @Column('varchar2', { name: 'LATENCY', nullable: true, length: 8 })
  latency: string | null;

  @Column('date', { name: 'LAST_TIME', nullable: true })
  lastTime: Date | null;

  @Column('number', { primary: true, name: 'JOBNO', nullable: true })
  jobno: number | null;

  @Column('varchar2', { name: 'DURATION', nullable: true, length: 8 })
  duration: string | null;

  @Column('varchar2', { name: 'DESTINATION', length: 390 })
  destination: string;
}
