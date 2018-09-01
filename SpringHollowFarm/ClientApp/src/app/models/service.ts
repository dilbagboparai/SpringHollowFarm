import { KeyValue } from './keyValue'
export class Service{
    id:string;
    name : string;
    description :string;
    image : string;
    price: number;
    totalPrice:number;
    additionalFees: KeyValue[];
    metaData:KeyValue[];
}
