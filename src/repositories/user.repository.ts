import { connection } from "../config/dbConnection";
import { User } from "../models/user.model";

export class UserRepository {

    static createUserTable(): Promise<User[]> {
      return new Promise((resolve, reject) => {
        connection.query<User[]>("CREATE TABLE IF NOT EXISTS `users` ( id int NOT NULL PRIMARY KEY AUTO_INCREMENT,firstName varchar(255) NOT NULL,lastName varchar(255) NOT NULL,userName varchar(255) NOT NULL unique,email varchar(255) NOT NULL unique,role varchar(100) NOT NULL,password varchar(255) NOT NULL) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;", (err, res) => {
          if (err) reject(err)
          else resolve(res)
        })
      })
    }

    static getAll(): Promise<User[]> {
      return new Promise((resolve, reject) => {
        connection.query<User[]>("SELECT * FROM users", (err, res) => {
          if (err) reject(err)
          else resolve(res)
        })
      })
    }

    static getById(user_id: number): Promise<User | undefined> {
      return new Promise((resolve, reject) => {
        connection.query<User[]>(
          "SELECT * FROM users WHERE id = ?",
          [user_id],
          (err, res) => {
            if (err) reject(err)
            else resolve(res?.[0])
          }
        )
      })
    }

    static getByEmail(email: string): Promise<User | undefined> {
      return new Promise((resolve, reject) => {
        connection.query<User[]>(
          "SELECT * FROM users WHERE email = ?",
          [email],
          (err, res) => {
            if (err) reject(err)
            else resolve(res?.[0])
          }
        )
      })
    }

    static create(user: User): Promise<User> {
      return new Promise((resolve, reject) => {
        connection.query<any>(
          "INSERT INTO users (firstName, lastName, userName, email, role, password) VALUES (?,?,?,?,?,?)",
          [user.firstName, user.lastName, user.userName, user.email, user.role, user.password],
          (err, res) => {
            if (err){
              console.log(err)
              reject(err)
            }
            else
              this.getByEmail(res.email)
                .then(user => resolve(user!))
                .catch(reject)
          }
        )
      })
    }
}

export default new UserRepository();
  
