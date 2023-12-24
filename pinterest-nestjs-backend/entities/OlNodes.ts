import { Column, Entity } from 'typeorm';

@Entity('OL$NODES')
export class OlNodes {
  @Column('number', { name: 'PARENT_ID', nullable: true })
  parentId: number | null;

  @Column('varchar2', { name: 'CATEGORY', nullable: true, length: 128 })
  category: string | null;

  @Column('varchar2', { name: 'NODE_NAME', nullable: true, length: 64 })
  nodeName: string | null;

  @Column('number', { name: 'NODE_ID', nullable: true })
  nodeId: number | null;

  @Column('number', { name: 'NODE_TEXTOFF', nullable: true })
  nodeTextoff: number | null;

  @Column('number', { name: 'NODE_TYPE', nullable: true })
  nodeType: number | null;

  @Column('number', { name: 'NODE_TEXTLEN', nullable: true })
  nodeTextlen: number | null;

  @Column('varchar2', { name: 'OL_NAME', nullable: true, length: 128 })
  olName: string | null;
}
