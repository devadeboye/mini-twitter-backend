import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class StoredFile {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  publicId: string;

  @Column()
  version: number;

  @Column()
  signature: string;

  @Column()
  width: number;

  @Column()
  height: number;

  @Column()
  format: string;

  @Column()
  resourceType: string;

  @Column()
  createdAt: string;

  @Column()
  bytes: number;

  @Column()
  type: string;

  @Column()
  url: string;

  @Column()
  secureUrl: string;
}
