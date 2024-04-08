import { RowDataPacket } from "mysql2";

export interface User extends RowDataPacket {
  id?: number;
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  role: string;
  password: string;
}