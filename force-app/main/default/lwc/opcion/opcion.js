import { LightningElement, api, track } from 'lwc';

export default class Opcion extends LightningElement {

    @track nombre;
    esCorrecta;

    @api
    enviarOpciones() {
        this.dispatchEvent(new CustomEvent('eventoopcion', { detail: {nombre: this.nombre, esCorrecta: this.esCorrecta}}));
    }

    handleNombreOpcion(e) {
        this.nombre = e.target.value;
    }

    handleChangeCheck(e) {
            this.esCorrecta = e.detail.checked;
    }

    eliminarOpcion(e) {
        const opcion = e.target.closest('c-opcion');
        opcion.remove();
    }
}

