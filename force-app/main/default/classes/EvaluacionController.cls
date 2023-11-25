public with sharing class EvaluacionController {
    
    @AuraEnabled
    public static Map<String, Object> insertarEvaluacion(String name, String accountId) {
        Map<String, Object> result = new Map<String, Object>();
        try{
            if(String.isEmpty(name)){
                throw new AuraHandledException('No pueden haber campos nulos');
            }
            Evaluacion__c e = new Evaluacion__c(Name=name, Account__c=accountId);
            Database.UpsertResult saveResult = Database.upsert(e, false);
        
            result.put('success', saveResult.success);
            result.put('id', saveResult.getId());
            result.put('isCreated', saveResult.isCreated());
        }catch(Exception e){
            result.put('success', false);
            result.put('errorMessage', e.getMessage());
        }
        return result;
    }
}