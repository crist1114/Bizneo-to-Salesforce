import { LightningElement, track, api } from 'lwc';
import insertarEvaluacion from '@salesforce/apex/EvaluacionController.insertarEvaluacion'
import insertarPregunta from '@salesforce/apex/PreguntaController.insertarPregunta'
import insertarPreguntaEvaluacion from '@salesforce/apex/PreguntaEvaluacionController.insertarPreguntaEvaluacion'
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class Evaluacion extends LightningElement {

    @track cant = [{ item: 0 }];
    @track preguntas =[]
    @track opciones =[]
    @track nombre;
    @api recordId;

    agregarPregunta() {
        this.cant.push({ item: this.cant.length + 1 });
    }

    setearNombre(e) {
        this.nombre = e.target.value;
    }

    async guardarEvaluacion() {
        const preguntas = this.template.querySelectorAll('c-pregunta');
        preguntas.forEach((elemento)=>{
            elemento.enviarPreguntas();
        });
        const resultEvaluacion = await insertarEvaluacion({ name: this.nombre, accountId: this.recordId});
        const resultPreguntas = await insertarPregunta({preguntas: this.preguntas, opciones: this.opciones});

        const preguntasEvaluacion = [];
        resultPreguntas.ids.forEach(idPregunta =>{
            preguntasEvaluacion.push({Pregunta__c: idPregunta, Evaluacion__c: resultEvaluacion.id});
        })
        const resultPreguntasEvaluacion = await insertarPreguntaEvaluacion({preguntasEvaluacion: preguntasEvaluacion});
        console.log(resultPreguntasEvaluacion);
        if(resultPreguntasEvaluacion.success){
            this.closeModalAction();
            this.showToast('Exito', 'Se ha guardado la evaluacion', 'success');
        }
        else{this.showToast('Error', resultPreguntasEvaluacion.errorMessage, 'error');}
    }

    showToast(title, message, variant) {
        const event = new ShowToastEvent({
            title: title,
            message: message,
            variant: variant
        });
        this.dispatchEvent(event);
    }

    handleEventoPregunta(e){
        this.preguntas.push({Name: e.detail.nombre, Tipo__c: e.detail.tipo});
        this.opciones.push(e.detail.opciones);
    }

    closeModalAction() {
        this.dispatchEvent(new CustomEvent('eventomodal', { detail: false }));
    }
}