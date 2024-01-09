package com.techbuzzblogs.workflow.tasks;

import org.camunda.bpm.engine.RuntimeService;
import org.camunda.bpm.engine.delegate.DelegateExecution;
import org.camunda.bpm.engine.delegate.JavaDelegate;
import org.camunda.bpm.engine.runtime.ActivityInstance;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class VerifyTest implements JavaDelegate {

    @Autowired
    private RuntimeService runtimeService;

    @Override
    public void execute(DelegateExecution delegateExecution) throws Exception {
        String instanceId = delegateExecution.getVariable("video").toString();
        System.out.println(instanceId);

        ActivityInstance activityInstance = runtimeService.getActivityInstance(instanceId);

        System.out.println(activityInstance);

        if (activityInstance == null) {
            throw new RuntimeException("activityInstance created failed, id:" + instanceId);
        }
    }
}
