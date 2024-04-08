import mysql from "mysql2";
import dbConfig from "./db.config";
import { UserRepository } from "../repositories/user.repository";
import { GroceryRepository } from "../repositories/grocery.repository";
import { OrdersRepository } from "../repositories/order.repository";

export const connection = mysql.createPool({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB
});

connection.getConnection(()=>{
  console.log("DB Connected");
  console.log("Creating tables if not present");
  UserRepository.createUserTable();
  GroceryRepository.createGroceryTable();
  OrdersRepository.createOrderTable()
})