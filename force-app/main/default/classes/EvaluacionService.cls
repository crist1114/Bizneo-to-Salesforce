public with sharing class EvaluacionService {

    @AuraEnabled
    public static List<Evaluacion__c> getEvaluaciones() {
    
        List<Evaluacion__c> evaluaciones = new List<Evaluacion__c>();
        try {
            evaluaciones = [select id, name from Evaluacion__c]; 
    
        } catch (Exception e) {
            System.debug('Error al obtener evaluaciones: ' + e.getMessage());
        }
            return evaluaciones;
    }
}