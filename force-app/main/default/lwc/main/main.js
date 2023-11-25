import { LightningElement, api } from 'lwc';
import getEvaluaciones from '@salesforce/apex/EvaluacionService.getEvaluaciones';

export default class Main extends LightningElement {

    nuevaEvaluacion=false;
    @api recordId;

    evaluaciones = [];

    connectedCallback(){
        console.log('llamo evaluaciones')
        this.obtenerEvaluaciones();
    }

    async obtenerEvaluaciones() {
        await getEvaluaciones().then(data=>{
            if (data) {
                console.log('aqui vienen las evaluaciones')
                console.log(data)
                this.evaluaciones = data;
            } else if (error) {
                console.error('Error al obtener las evaluaciones:', error);
            }
        })
        .catch(error => {
            console.error('hubo un error', error);
          });
    }

    mostrarEvaluacion(){
        this.nuevaEvaluacion=!this.nuevaEvaluacion;
    }

    handleRecibirEventoModal(e){
        this.mostrarEvaluacion();
    }
}