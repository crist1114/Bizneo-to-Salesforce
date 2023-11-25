public with sharing class PreguntaEvaluacionController {

    @AuraEnabled
    public static Map<String, Object> insertarPreguntaEvaluacion(List<Preguntas_Evaluacion__c> preguntasEvaluacion) {
        Map<String, Object> result = new Map<String, Object>();
        try{
            if(preguntasEvaluacion.isEmpty()){
                throw new AuraHandledException('No pueden haber campos nulos');
            }
            List<Database.UpsertResult> saveResult = Database.upsert(preguntasEvaluacion, true);
            List<String> ids = new List<String>();
            for (Database.UpsertResult Sresult : saveResult) {
                ids.add(Sresult.getId());
            }
            result.put('ids', ids);
            result.put('success', true);
        }catch(Exception e){
            result.put('success', false);
            result.put('errorMessage', e.getMessage());
        }
        return result;
    }
}