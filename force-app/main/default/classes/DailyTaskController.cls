public with sharing class DailyTaskController {

	@AuraEnabled
	public static List<Daily_Task__c> getCurrentUserDailyTaskList() {
		return [SELECT Id, Name, Description__c
				FROM Daily_Task__c
				WHERE OwnerId = :UserInfo.getUserId() AND CreatedDate > :Date.today()
				ORDER BY CreatedDate];
	}

	@AuraEnabled
	public static void deleteDailyTask(String taskId) {
		delete [SELECT Id FROM Daily_Task__c WHERE Id = :taskId];
	}
}