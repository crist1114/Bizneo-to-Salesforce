public with sharing class PreguntaController {
    
    @AuraEnabled
    public static Map<String, Object> insertarPregunta(List<Pregunta__c> preguntas, List<List<Opcion__c>> opciones) {

        Map<String, Object> result = new Map<String, Object>();
        try{
            if(preguntas.isEmpty()){
                throw new AuraHandledException('No hay preguntas que agregar');
            }
            List<Database.UpsertResult> saveResult = Database.upsert(preguntas, true);
            List<String> ids = new List<String>();
            List<Opcion__c> opcionesAInsertar = new List<Opcion__c>();

            for (Integer i=0; i<saveResult.size(); i++) {
                List<Opcion__c> opcionesTemp = opciones[i];
                Id id = saveResult[i].getId();
            //asigno el id de la pregunta a cada opcion
                for (Integer j = 0; j < opcionesTemp.size(); j++) {
                    Opcion__c op = opcionesTemp[j];
                    op.Pregunta__c = id;
                    opcionesAInsertar.add(op);
                }
                ids.add(id);
            }
            insert opcionesAInsertar;
            result.put('ids', ids);
            
        }catch(Exception e){
            result.put('success', false);
            result.put('errorMessage', new List<Object>{e.getMessage()});
        }
        return result;
    }

}