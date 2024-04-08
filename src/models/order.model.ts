import { RowDataPacket } from "mysql2";

export interface Order extends RowDataPacket {
    id?: number;
    userId: number;
    itemId: number;
    quantity: number;
} 