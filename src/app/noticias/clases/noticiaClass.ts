import { noticia } from './noticiaInterface';

export class Noticia implements noticia {
    body: string;
    categorias: string[];
    fecha: string;
    imageurl: string;
    siglas: string;
    source: string;
    title: string;
    url: string;


    constructor(obj:Object) {
        this.body = obj['body'];
        this.categorias = obj['categorias'];
        this.fecha = obj['fechaBuena'];
        this.imageurl = obj['imageurl'];
        this.siglas = obj['siglas'];
        this.source = obj['source'];
        this.title = obj['title'];
        this.url = obj['url'];
    }



    subirAServidor() {
        throw new Error("Method not implemented.");
    }
    bajarDeServidor() {
        throw new Error("Method not implemented.");
    }
    toString() {
        return this.body + "\t" + this.categorias  + "\t" + this.fecha + "\t" + this.imageurl + "\t" + this.siglas + "\t" + this.source + "\t" + this.title + "\t" + this.url;
    }



}