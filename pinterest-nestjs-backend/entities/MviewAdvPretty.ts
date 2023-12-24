import { Column, Entity, Index } from 'typeorm';

@Index('MVIEW$_ADV_PRETTY_IDX_01', ['queryid'], {})
@Entity('MVIEW$_ADV_PRETTY')
export class MviewAdvPretty {
  @Column('number', { name: 'QUERYID#', nullable: true })
  queryid: number | null;

  @Column('long', { name: 'SQL_TEXT', nullable: true })
  sqlText: string | null;
}
