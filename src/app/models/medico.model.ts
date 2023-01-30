interface Usuario {
    _id: string;
    nombre: string;
    img?: string;
}

interface Hospital {
    _id: string;
    nombre: string;
    img?: string;
}

export class Medicos {
    constructor(
        public _id: string,
        public nombre: string,
        public usuario: Usuario,
        public hospital: Hospital,
        public img?: string,
    ) { }

}