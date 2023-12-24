import { Column, Entity, Index } from 'typeorm';

@Index('MVIEW$_ADV_TEMP_IDX_01', ['id', 'seq'], {})
@Entity('MVIEW$_ADV_TEMP')
export class MviewAdvTemp {
  @Column('number', { name: 'SEQ#', nullable: true })
  seq: number | null;

  @Column('number', { name: 'ID#', nullable: true })
  id: number | null;

  @Column('long', { name: 'TEXT', nullable: true })
  text: string | null;
}
