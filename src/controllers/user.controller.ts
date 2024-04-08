import { Request, Response } from "express";
import { UserRepository } from "../repositories/user.repository";
import bcrypt from 'bcryptjs';
import jwt, { Secret } from 'jsonwebtoken';

const getAll = async (req: Request, res: Response) => {
  try {
    const users = await UserRepository.getAll();
    res.status(200).send(users);
  } catch (err) {
    res.status(500).send({
      message: "Error fetching data"
    });
  }
}

const getById = async (req: Request, res: Response) => {
  try {
    const user = await UserRepository.getById(req.body.id);
    res.status(200).send(user);
  } catch (err) {
    res.status(500).send({
      message: "Error fetching data"
    });
  }
}

const create = async (req: Request, res: Response) => {
  try {
    const existingUser = await UserRepository.getByEmail(req.body.email);
    if (existingUser) {
      res.status(400).send({ message: "User already exists" });
    } else {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      req.body.password = hashedPassword;
      await UserRepository.create(req.body)
      res.status(200).send({ message: "User created Successfully" });
    }
  } catch (err) {
    res.status(500).send({
      message: "Error while creating User"
    });
  }
}

const login = async (req: Request, res: Response) => {
  try {
    const existingUser = await UserRepository.getByEmail(req.body.email);
    if (existingUser) {
      const passwordMatch = await bcrypt.compare(req.body.password, existingUser.password);
      if (!passwordMatch) {
        return res.status(401).json({ message: 'Invalid password or email' });
      }
      // Generate JWT token
      const jwtSecret = process.env.JWT_SECRET;
      const token = jwt.sign({ userId: existingUser.id, userName: existingUser.userName, role: existingUser.role }, jwtSecret as Secret);
      res.status(200).send({ token });
    } else {
      res.status(404).send({ message: "User Not Found" });
    }
  } catch (err) {
    res.status(500).send({
      message: "Internal Server Error"
    });
  }
}


export default { getAll, getById, create, login }