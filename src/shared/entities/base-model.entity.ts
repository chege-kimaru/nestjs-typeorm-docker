import { PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";

export abstract class BaseModel {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    // @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    // @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
}