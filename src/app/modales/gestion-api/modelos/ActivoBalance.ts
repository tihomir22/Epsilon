import { ActivoBalanceInterface } from "./ActivoBalanceInterface";

export class ActivoBalance implements ActivoBalanceInterface{
    nombre: string;    
    available: number;
    onOrder: number;
    btcValue: number;
    btcTotal: number;
    imgURL:string;


}