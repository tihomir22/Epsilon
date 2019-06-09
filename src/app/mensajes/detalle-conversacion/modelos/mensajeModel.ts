export interface mensajeModel {
    id?:number;
    id_usuario_emisor: number;
    id_usuario_receptor: number;
    mensaje: string;
    fecha: any;
    visto: number;
}