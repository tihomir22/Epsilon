import { ExchangeInterface } from "./exchangeInterface";

export class exchangeClass implements ExchangeInterface{
    public nombre: string;    
    public descripcion: string;
    public localizacion: string;
    public regulador: string;
    public imagen_icono: string;

    constructor(){

    }
    public getNombre(){
        return this.nombre;
    }
    public getDescripcion(){
        return this.descripcion;
    }
    public getLocalizacion(){
        return this.localizacion;
    }
    public getRegulador(){
        return this.regulador;
    }
    public getImagenIcono(){
        return this.imagen_icono;
    }
}