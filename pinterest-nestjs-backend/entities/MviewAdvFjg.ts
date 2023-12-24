import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { MviewAdvAjg } from './MviewAdvAjg';
import { MviewAdvGc } from './MviewAdvGc';

@Index('MVIEW$_ADV_FJG_PK', ['fjgid'], { unique: true })
@Entity('MVIEW$_ADV_FJG')
export class MviewAdvFjg {
  @Column('number', { name: 'HASHVALUE' })
  hashvalue: number;

  @Column('number', { name: 'FREQUENCY', nullable: true })
  frequency: number | null;

  @Column('number', { primary: true, name: 'FJGID#' })
  fjgid: number;

  @Column('number', { name: 'FJGDESLEN' })
  fjgdeslen: number;

  @Column('long raw', { name: 'FJGDES' })
  fjgdes: Buffer;

  @ManyToOne(() => MviewAdvAjg, (mviewAdvAjg) => mviewAdvAjg.mviewAdvFjgs)
  @JoinColumn([{ name: 'AJGID#', referencedColumnName: 'ajgid' }])
  ajgid: MviewAdvAjg;

  @OneToMany(() => MviewAdvGc, (mviewAdvGc) => mviewAdvGc.fjgid)
  mviewAdvGcs: MviewAdvGc[];
}
