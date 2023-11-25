import { LightningElement, track, api } from 'lwc';
export default class Pregunta extends LightningElement {

    @track nombre;
    @track tipo;
    @track unica=false;
    @track cant = [{ item: 0 }];
    @track opciones = [];

    get options() {
        return [
            { label: 'Unica Respuesta', value: 'Unica Respuesta' },
            { label: 'Seleccion Multiple', value: 'Seleccion Multiple' },
        ];
    }

    //aqui llamo el metodo que dispara el evento hacia pregunta para guardar las opciones
    @api
    enviarPreguntas() {
        const op = this.template.querySelectorAll('c-opcion');
        op.forEach(el=>{
            el.enviarOpciones();
        });

        this.dispatchEvent(new CustomEvent('eventopregunta', { detail: {nombre: this.nombre, tipo: this.tipo, opciones: this.opciones} }));
    }

    handleEventoOpcion(e) {
        this.opciones.push({ Name: e.detail.nombre, Es_correcta__c: e.detail.esCorrecta }); 
    }

    handleChangeNombre(e) {
        this.nombre = e.target.value;
    }

    handleSelectTipo(e) {
        this.tipo = e.target.value;
    }

    agregarOpcion() {
        this.cant.push({ item: this.cant.length + 1 });
    }

    eliminarPregunta(e) {
        const pregunta = e.target.closest('c-pregunta');
        pregunta.remove();
    }
}