import { connection } from "../config/dbConnection";
import { Grocery } from "../models/grocery.model";
import fs from 'fs';

export class GroceryRepository {

  static createGroceryTable(): Promise<Grocery[]> {
    return new Promise((resolve, reject) => {
      connection.query<Grocery[]>("CREATE TABLE IF NOT EXISTS `grocery` (id int NOT NULL PRIMARY KEY AUTO_INCREMENT,name varchar(255) NOT NULL,type varchar(255) NOT NULL,price float NOT NULL,quantity int NOT NULL,image longblob) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;", (err, res) => {
        if (err) reject(err)
        else resolve(res)
      })
    })
  }

  static getAll(): Promise<Grocery[]> {
    return new Promise((resolve, reject) => {
      connection.query<Grocery[]>("SELECT * FROM grocery", (err, res) => {
        if (err) reject(err)
        else resolve(res)
      })
    })
  }

  static getAvailableItems(): Promise<Grocery[]> {
    return new Promise((resolve, reject) => {
      connection.query<Grocery[]>("SELECT * FROM grocery WHERE quantity > 0", (err, res) => {
        if (err) reject(err)
        else resolve(res)
      })
    })
  }

  static getById(grocery_id: number): Promise<Grocery | undefined> {
    return new Promise((resolve, reject) => {
      connection.query<Grocery[]>(
        "SELECT * FROM grocery WHERE id = ?",
        [grocery_id],
        (err, res) => {
          if (err) reject(err)
          else resolve(res?.[0])
        }
      )
    })
  }

  static getByName(grocery_name: string): Promise<Grocery | undefined> {
    return new Promise((resolve, reject) => {
      connection.query<Grocery[]>(
        "SELECT * FROM grocery WHERE name = ?",
        [grocery_name],
        (err, res) => {
          if (err) reject(err)
          else resolve(res?.[0])
        }
      )
    })
  }

  static getByType(grocery_type: string): Promise<Grocery | undefined> {
    return new Promise((resolve, reject) => {
      connection.query<Grocery[]>(
        "SELECT * FROM grocery WHERE type = ?",
        [grocery_type],
        (err, res) => {
          if (err) reject(err)
          else resolve(res?.[0])
        }
      )
    })
  }

  static create(grocery: Grocery): Promise<Grocery> {
    const imageBuffer = fs.readFileSync(grocery.image);
    return new Promise((resolve, reject) => {
      connection.query<any>(
        "INSERT INTO grocery (name, type, price, quantity, image) VALUES (?,?,?,?,?)",
        [grocery.name, grocery.type, grocery.price, grocery.quantity, imageBuffer],
        (err, res) => {
          if (err) {
            console.log(err)
            reject(err)
          }
          else
            this.getByName(res.name)
              .then(grocery => resolve(grocery!))
              .catch(reject)
        }
      )
    })
  }

  static update(grocery: Grocery): Promise<Grocery> {
    const imageBuffer = fs.readFileSync(grocery.image);
    return new Promise((resolve, reject) => {
      connection.query<Grocery[]>(
        "UPDATE grocery SET name = ?, type = ?, price = ?, quantity = ?, image = ? WHERE id = ? LIMIT 1",
        [grocery.name, grocery.type, grocery.price, grocery.quantity, imageBuffer, grocery.id],
        (err, res) => {
          if (err) reject(err)
          else resolve(res?.[0])
        }
      )
    })
  }

  static delete(grocery_id: string): Promise<Grocery | undefined> {
    return new Promise((resolve, reject) => {
      connection.query<Grocery[]>(
        "DELETE FROM grocery WHERE id = ? LIMIT 1",
        [grocery_id],
        (err, res) => {
          if (err) reject(err)
          else resolve(res?.[0])
        }
      )
    })
  }
}