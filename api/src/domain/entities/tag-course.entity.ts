import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "tag_courses" })
export class TagCourse {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    tag_id: number;

    @Column()
    name: string;

    @Column()
    url: string;

    @Column()
    thumbnail_url: string;

    @Column()
    priority: number;

    @Column()
    platform: string;

    tag_name: string;
}