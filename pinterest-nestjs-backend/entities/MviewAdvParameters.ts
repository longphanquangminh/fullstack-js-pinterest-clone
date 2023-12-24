import { Column, Entity, Index } from 'typeorm';

@Index('MVIEW$_ADV_PARAMETERS_PK', ['parameterName'], { unique: true })
@Entity('MVIEW$_ADV_PARAMETERS')
export class MviewAdvParameters {
  @Column('varchar2', { name: 'STRING_VALUE', nullable: true, length: 30 })
  stringValue: string | null;

  @Column('number', { name: 'PARAMETER_TYPE' })
  parameterType: number;

  @Column('varchar2', { primary: true, name: 'PARAMETER_NAME', length: 128 })
  parameterName: string;

  @Column('number', { name: 'NUMERICAL_VALUE', nullable: true })
  numericalValue: number | null;

  @Column('date', { name: 'DATE_VALUE', nullable: true })
  dateValue: Date | null;
}
