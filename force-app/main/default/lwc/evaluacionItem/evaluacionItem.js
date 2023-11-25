import { LightningElement, api } from 'lwc';
import NAME_FIELD from '@salesforce/schema/Evaluacion__c.Name';


export default class EvaluacionItem extends LightningElement {

    fields = [NAME_FIELD];

    // Flexipage provides recordId and objectApiName
    @api fila;
    @api objectApiName;

    closeModalAction() {
        this.dispatchEvent(new CustomEvent('eventomodal', { detail: false }));
    }

}