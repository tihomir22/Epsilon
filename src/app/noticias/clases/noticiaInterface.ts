export interface noticia{
    body:string;
    categorias:Array<string>;
    fecha:string;
    imageurl:string;
    siglas:string;
    source:string;
    title:string;
    url:string;

    subirAServidor();
    bajarDeServidor();
}