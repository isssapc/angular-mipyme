export class Usuario {

    id?: string;
    nombre?: string;
    email?: string;
    id_rol?: string;
    password?: string;

    public static copiar(usuario: Usuario): Usuario {
        let copia = JSON.stringify(usuario);
        return JSON.parse(copia);


    }


}