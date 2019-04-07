import { apiInterfaz } from "./apiInterfaz";

export class apiModel implements apiInterfaz{
    apiKey: string;
    privateKey: string;
 
    public id: number;
    public id_exchange_api: number;
    public id_usuario: number;
    public nombre: string;

    constructor(){
        
    }
}