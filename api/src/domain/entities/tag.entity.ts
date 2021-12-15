import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'tags' })
export class Tag {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    value: string;

    @Column()
    keywords: string;

    @Column()
    is_skill: boolean;
}
