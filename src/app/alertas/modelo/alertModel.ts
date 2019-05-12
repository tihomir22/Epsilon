import { Observable, Subscription } from "rxjs";

export interface AlertModelInterface {
    numero: number;
    title: string;
    tipo: string;
    subtipo: string;
    tiempo_segundos: number;
    observable: Subscription;
    simbolo_base: string;
    simbolo_contra: string;
    subitems?:string;
}