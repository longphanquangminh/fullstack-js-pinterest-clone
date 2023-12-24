import { Column, Entity, Index } from 'typeorm';

@Index('OL$NAME', ['olName'], { unique: true })
@Index('OL$SIGNATURE', ['signature', 'category'], { unique: true })
@Entity('OL$')
export class Ol {
  @Column('varchar2', { name: 'VERSION', nullable: true, length: 64 })
  version: string | null;

  @Column('long', { name: 'SQL_TEXT', nullable: true })
  sqlText: string | null;

  @Column('number', { name: 'FLAGS', nullable: true })
  flags: number | null;

  @Column('varchar2', { name: 'CREATOR', nullable: true, length: 128 })
  creator: string | null;

  @Column('date', { name: 'TIMESTAMP', nullable: true })
  timestamp: Date | null;

  @Column('number', { name: 'TEXTLEN', nullable: true })
  textlen: number | null;

  @Column('varchar2', { name: 'OL_NAME', nullable: true, length: 128 })
  olName: string | null;

  @Column('number', { name: 'SPARE1', nullable: true })
  spare1: number | null;

  @Column('raw', { name: 'SIGNATURE', nullable: true, length: 16 })
  signature: Buffer | null;

  @Column('varchar2', { name: 'SPARE2', nullable: true, length: 1000 })
  spare2: string | null;

  @Column('varchar2', { name: 'CATEGORY', nullable: true, length: 128 })
  category: string | null;

  @Column('number', { name: 'HASH_VALUE', nullable: true })
  hashValue: number | null;

  @Column('number', { name: 'HINTCOUNT', nullable: true })
  hintcount: number | null;

  @Column('number', { name: 'HASH_VALUE2', nullable: true })
  hashValue2: number | null;
}
