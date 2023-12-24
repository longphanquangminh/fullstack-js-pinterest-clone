import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { MviewAdvFjg } from './MviewAdvFjg';

@Index('MVIEW$_ADV_GC_PK', ['gcid'], { unique: true })
@Entity('MVIEW$_ADV_GC')
export class MviewAdvGc {
  @Column('number', { name: 'HASHVALUE' })
  hashvalue: number;

  @Column('number', { primary: true, name: 'GCID#' })
  gcid: number;

  @Column('number', { name: 'GCDESLEN' })
  gcdeslen: number;

  @Column('number', { name: 'FREQUENCY', nullable: true })
  frequency: number | null;

  @Column('long raw', { name: 'GCDES' })
  gcdes: Buffer;

  @ManyToOne(() => MviewAdvFjg, (mviewAdvFjg) => mviewAdvFjg.mviewAdvGcs)
  @JoinColumn([{ name: 'FJGID#', referencedColumnName: 'fjgid' }])
  fjgid: MviewAdvFjg;
}
