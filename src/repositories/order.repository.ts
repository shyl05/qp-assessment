import { connection } from "../config/dbConnection";
import { Order } from "../models/order.model";

export class OrdersRepository {

    static createOrderTable(): Promise<Order[]> {
        return new Promise((resolve, reject) => {
            connection.query<Order[]>("CREATE TABLE IF NOT EXISTS `orders` (id int NOT NULL PRIMARY KEY AUTO_INCREMENT,userId int NOT NULL,itemId int NOT NULL,quantity int NOT NULL) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;", (err, res) => {
                if (err) reject(err)
                else resolve(res)
            })
        })
    }

    static getOrderList(user_id: number): Promise<Order[]> {
        return new Promise((resolve, reject) => {
            connection.query<Order[]>("SELECT * FROM orders WHERE userId = ?",
                [user_id],
                (err, res) => {
                    if (err) reject(err)
                    else resolve(res)
                })
        })
    }

    static orderItem(order: Order): Promise<Order[]> {
        return new Promise((resolve, reject) => {
            connection.query<any>(
                "INSERT INTO orders (userId, itemId, quantity) VALUES (?,?,?)",
                [order.userId, order.itemId, order.quantity],
                (err, res) => {
                    if (err) {
                        console.log(err)
                        reject(err)
                    }
                    else {
                        connection.query<any>("UPDATE grocery SET quantity = quantity - ? WHERE id = ? LIMIT 1",
                            [order.quantity, order.itemId],
                            (err, res) => {
                                if (err) {
                                    reject(err)
                                } else resolve(res)
                            }
                        )
                    }
                })
        })
    }
}