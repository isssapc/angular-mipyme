export class Anuncio {


    id_anuncio?: string;

    titulo?: string;
    descripcion?: string;
    fecha_publicacion?: string;
    precio?: string;
    categoria?: string;

    img_src?: string;
    avatar_src?: string;

    es_oferta?: boolean;
    mostrar_precios?: boolean;
    mostrar_agregar?: boolean;

    public static copiar(anuncio: Anuncio): Anuncio {
        let copia = new Anuncio();

        copia.titulo = anuncio.titulo;
        copia.descripcion = anuncio.descripcion;
        copia.fecha_publicacion = anuncio.fecha_publicacion;
        copia.precio = anuncio.precio;
        copia.categoria = anuncio.categoria;
        copia.img_src = anuncio.img_src;
        copia.avatar_src = anuncio.avatar_src;
        copia.es_oferta = anuncio.es_oferta;
        copia.mostrar_precios = anuncio.mostrar_precios;
        copia.mostrar_agregar = anuncio.mostrar_agregar;


        return copia;
    }

    public copiar(): Anuncio {
        let copia = new Anuncio();

        copia.titulo = this.titulo;
        copia.descripcion = this.descripcion;
        copia.fecha_publicacion = this.fecha_publicacion;
        copia.precio = this.precio;
        copia.categoria = this.categoria;
        copia.img_src = this.img_src;
        copia.avatar_src = this.avatar_src;
        copia.es_oferta = this.es_oferta;
        copia.mostrar_precios = this.mostrar_precios;
        copia.mostrar_agregar = this.mostrar_agregar;


        return copia;


    }



}