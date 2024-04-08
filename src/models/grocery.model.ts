import { RowDataPacket } from "mysql2";

export interface Grocery extends RowDataPacket {
  id?: number;
  name: string;
  type: string;
  price: number;
  quantity: number;
  image: string;
}