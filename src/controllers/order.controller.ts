import { Request, Response } from "express";
import { OrdersRepository } from "../repositories/order.repository";
import { Order } from "../models/order.model";

const getAll = async (req: Request, res: Response) => {
    try {
        const order = await OrdersRepository.getOrderList(req.body.userId);
        res.status(200).send(order);
    } catch (err) {
        res.status(500).send({
            message: "Internal Server Error"
        });
    }
}

const orderItems = async (req: Request, res: Response) => {
    try {
        const items = req.body.items;
        const user = req.body.userId;
        if(items.length > 0 ){
            items.map(async (item: Order)=>{
                const newOrderItem : any = {
                    userId : user,
                    itemId : item.itemId,
                    quantity : item.quantity
                } 
                await OrdersRepository.orderItem(newOrderItem)
            })
        }
        res.status(200).send({message: "Order placed Successfully"});
    } catch (err) {
        res.status(500).send({
            message: "Internal Server Error"
        });
    }
}

export default { getAll, orderItems}

