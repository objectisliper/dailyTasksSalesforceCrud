@isTest
public class DailyTaskControllerTest {

	@isTest
	static void testIsTodayTasksShows() {
		Integer tasksCount = 5;
		for (Integer i = 0; i < tasksCount; i++) {
			insert new Daily_Task__c(Name = 'Test name', Description__c = 'Test description');
		}

		List<Daily_Task__c> tasksList = DailyTaskController.getCurrentUserDailyTaskList();
		System.assertEquals(tasksCount, tasksList.size());
	}

	@isTest
	static void testIsYesterdayTasksHidden() {
		for (Integer i = 0; i < 5; i++) {
			Daily_Task__c yesterdayDailyTask = new Daily_Task__c(Name = 'Test name', Description__c = 'Test description');
			insert yesterdayDailyTask;

			Datetime yesterday = Datetime.now().addDays(-1);
			Test.setCreatedDate(yesterdayDailyTask.Id, yesterday);
		}

		List<Daily_Task__c> tasksList = DailyTaskController.getCurrentUserDailyTaskList();
		System.assertEquals(0, tasksList.size());
	}

	@isTest
	static void testTaskDeletedCorrect() {
		Daily_Task__c taskToDelete = new Daily_Task__c(Name = 'Test name', Description__c = 'Test description');
		insert taskToDelete;

		DailyTaskController.deleteDailyTask(taskToDelete.Id);
		System.assertEquals(0, [SELECT Id FROM Daily_Task__c WHERE Id = :taskToDelete.Id].size());
	}

	@isTest
	static void testTaskDeleteIncorrectId() {
		DailyTaskController.deleteDailyTask('some test id');
	}

}