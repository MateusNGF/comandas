import { iEntity } from "../../domain/contracts/iEntity";
import { ObjectManager } from "../utils";
import { ItemEntity } from "./itens/item.entity";

export class OrderEntity extends iEntity {
    
    public readonly company_id : string = null;
    public readonly event_id ?: string = null;
    public readonly itens : Array<OrderEntity.ItemOrder> = [];
    
    constructor(order : OrderEntity){
        super(order);
        ObjectManager.assing(this, order)
    }
}


export namespace OrderEntity {
    export abstract class ItemOrder implements Partial<ItemEntity>{
        public id: any;
        public type?: ItemEntity.TypeItens 
        public quantity: number;
        public name?: string;
        public sale_price?: number;
    }
} 