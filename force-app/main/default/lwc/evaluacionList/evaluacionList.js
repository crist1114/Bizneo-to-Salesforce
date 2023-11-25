import { LightningElement,api,track } from 'lwc';
const columns = [
    { label: 'Nombre', 
    fieldName: 'Name',
    },
    { label: 'Id', fieldName: 'Id'},
    {
        label: 'View',
        type: 'button-icon',
        initialWidth: 75,
        typeAttributes: {
        iconName: 'action:preview',
        title: 'Preview',
        variant: 'border-filled',
        alternativeText: 'View'
        }
    },
];
export default class EvaluacionList extends LightningElement {

    @api evaluaciones=[];
    columns = columns;
    @track container = false;
    @track fila;

    async handleRowAction(event) {
        this.fila = event.detail.row.Id;

        const bypassCache = Math.floor(Math.random() * 10);

        //await this.obtenerDescripcion();
        this.container = true;
    }

    handleRecibirEventoModal(e){
        this.container=e.detail;
    }

    


}