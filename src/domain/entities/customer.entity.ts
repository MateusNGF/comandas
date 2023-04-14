import { iEntity } from "../contracts/iEntity";
import { ObjectManager } from "../../utils";

export abstract class CustomerEntity extends iEntity {
    public readonly id: string = null;
    public readonly name: string = null;
    public readonly company_id: string = null;
    public readonly type: CustomerEntity.TypeCustomer = null;
    
    public readonly email?: string = null;
    public readonly phone?: string = null;
}

export namespace CustomerEntity {
    export type TypeCustomer = 'PF' | 'PJ';
}

export class CustomerPFEntity extends CustomerEntity {
    public readonly cpf: string;

    constructor(customerPF: CustomerPFEntity) {
        const customer : CustomerPFEntity = { ...customerPF, type: 'PF' };
        super(customer)
        ObjectManager.assing(this, customer);
    }
}


export class CustomerPJEntity extends CustomerEntity {
    public readonly cnpj: string;

    constructor(customerPJ: CustomerPJEntity) {
        const customer : CustomerPJEntity = { ...customerPJ, type: 'PJ' };
        super(customer)
        ObjectManager.assing(this, customer);
    }
}