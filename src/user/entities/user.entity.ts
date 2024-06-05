import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id:string;

  @Column('text',{nullable:false})
  firstName:string;

  @Column('text',{nullable:false})
  lastName:string;

  @Column('varchar',{ unique:true})
  username:string;
  
  @Column('text',{nullable:false})
  password:string;
  
  @Column('text',{nullable:true})
  image:string;

  @Column('boolean', {default:true})
  isAuthorized:boolean;

  @Column('boolean',{default:false})
  isLoged:boolean;
  @CreateDateColumn()
  createdAt:Date;

  @UpdateDateColumn()
  updateAt:Date;

}
