package com.techbuzzblogs.workflow.tasks;

import org.camunda.bpm.engine.RepositoryService;
import org.camunda.bpm.engine.delegate.DelegateExecution;
import org.camunda.bpm.engine.delegate.Expression;
import org.camunda.bpm.engine.delegate.JavaDelegate;
import org.camunda.bpm.engine.repository.ProcessDefinition;
import org.camunda.bpm.model.bpmn.instance.ServiceTask;
import org.camunda.bpm.model.bpmn.instance.camunda.CamundaProperties;
import org.camunda.bpm.model.bpmn.instance.camunda.CamundaProperty;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class WelcomeTasks implements JavaDelegate {
    // Field injections
    private Expression qaUrl;

    @Autowired
    private final RepositoryService repositoryService;

    public WelcomeTasks(RepositoryService repositoryService) {
        this.repositoryService = repositoryService;
    }

    @Override
    public void execute(DelegateExecution delegateExecution) {
        System.out.println("Welcome to Tech Buzz blogs !!!");
        System.out.println("Express variable [qaUrl]: " + qaUrl.getValue(delegateExecution));

        List<ProcessDefinition> processDefinitions = repositoryService.createProcessDefinitionQuery()
                .processDefinitionKey("tasks-learning")
                .orderByProcessDefinitionVersion()
                .asc()
                .list();



        // Extension properties retrieve
        ServiceTask serviceTask = (ServiceTask) delegateExecution.getBpmnModelElementInstance();
        CamundaProperties camundaProperties = serviceTask.getExtensionElements()
                .getElementsQuery()
                .filterByType(CamundaProperties.class).singleResult();

        for (CamundaProperty camundaProperty : camundaProperties.getCamundaProperties()) {
            System.out.println("extensions name: " + camundaProperty.getCamundaName());
            System.out.println("extensions value: " + camundaProperty.getCamundaValue());
        }
    }
}
