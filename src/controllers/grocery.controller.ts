import { Request, Response } from "express";
import { GroceryRepository } from "../repositories/grocery.repository";

const getAll = async (req: Request, res: Response) => {
  try {
    const grocery = await GroceryRepository.getAll();
    res.status(200).send(grocery);
  } catch (err) {
    res.status(500).send({
      message: "Internal Server Error"
    });
  }
}

const getAvailableItems = async (req: Request, res: Response) => {
  try {
    const grocery = await GroceryRepository.getAvailableItems();
    res.status(200).send(grocery);
  } catch (err) {
    res.status(500).send({
      message: "Internal Server Error"
    });
  }
}

const getById = async (req: Request, res: Response) => {
  try {
    const grocery = await GroceryRepository.getById(req.body.id);
    res.status(200).send(grocery);
  } catch (err) {
    res.status(500).send({
      message: "Internal Server Error"
    });
  }
}

const getByName = async (req: Request, res: Response) => {
  try {
    const grocery = await GroceryRepository.getByName(req.body.name);
    res.status(200).send(grocery);
  } catch (err) {
    res.status(500).send({
      message: "Internal Server Error"
    });
  }
}

const getByType = async (req: Request, res: Response) => {
  try {
    const grocery = await GroceryRepository.getByType(req.body.type);
    res.status(200).send(grocery);
  } catch (err) {
    res.status(500).send({
      message: "Internal Server Error"
    });
  }
}

const create = async (req: Request, res: Response) => {
  try {
    let existingGrocery = await GroceryRepository.getByName(req.body.name)
    if (existingGrocery) {
      res.status(400).send({ message: "Item already exists" });
    } else {
      await GroceryRepository.create(req.body)
      res.status(200).send({ message: "Item created Successfully" });
    }
  } catch (err) {
    res.status(500).send({
      message: "Internal Server Error"
    });
  }
}

const update = async (req: Request, res: Response) => {
  try {
    await GroceryRepository.update(req.body)
    res.status(200).send({ message: "Item updated Successfully" });
  } catch (err) {
    res.status(500).send({
      message: "Internal Server Error"
    });
  }
}

const deleteItem = async (req: Request, res: Response) => {
  try {
    await GroceryRepository.delete(req.body.id)
    res.status(200).send({ message: "Item deleted Successfully" });
  } catch (err) {
    res.status(500).send({
      message: "Internal Server Error"
    });
  }
}
export default { getAll, getAvailableItems, getById, getByName, getByType, create, update, deleteItem }