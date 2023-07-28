## [link to YouTube video - еще нет](#)

## [Reveal presentation's deploy](https://makaevaelena.github.io/CI_CD_Github_Actions_Reveal_Presentation/)

## [link to the transcript of presentation](https://disk.yandex.ru/i/Pzz_0LnMB3gJBg)

1. In this presentation, I will tell you about platform for CI/CD - GITHUB ACTIONS.\

2. What is CI /CD\
   CI is practice that involves developers making small changes and checks to their code.\
   Including Coding, Building and testing the app. \

   CD - Continuous Delivery \
   is the automated delivery of completed code to environments like testing and development. \

   Continuous deployment - is the next step of continuous delivery. Every change that passes the automated tests is automatically placed in production, resulting in many production deployments. \

   This pipeline show a process that drives software development. \

GitHub Actions - is a CI/CD platform that allows you to automate your build, test, and deployment pipeline. You can create workflows that build and test every pull request to your repository, or deploy merged pull requests to production. \

GitHub Actions allows us to run a CI/CD very easily and without much prior knowledge. \

GitHub Actions help you automate tasks within your software development life cycle. \
GitHub Actions are event-driven, meaning that you can run a series of commands after a specified event has occurred. \

2.2. There are a few words we need to understand before we begin working: Events, Workflows, Jobs, Steps. \

3. All GitHub Actions begin with an Event. \
   Events - are certain triggers that tell GitHub to execute the configured Actions. \

4.1. There are many events that you can listen for, here are a few common ones: Push, Pull_request, Fork, Issues, Release. \
Event listeners are configured using the on keyword inside our GitHub Actions configuration. \
You can have many events and many workflows to execute. \

5. Workflow - is the name of the configuration that contains all the jobs to execute. \
   The workflow name is set by using the name keyword in the configuration. \

6. The next component is jobs. This is a container that holds all the Steps to perform. \
   Jobs are set by using the jobs keyword in the workflow configuration. \
   Jobs can be configured to run with many useful settings. \

7. Jobs can contain many steps. A step is an actual action to perform. \
   A step is a name for a certain command or series of commands. \
   Steps reside inside Jobs and are set by using the steps keyword. \

8. This infographic showing the relationship between the components in GitHub Actions. \
   So one event can trigger many workflows, a workflow can contain many jobs, and a job can contain many steps. \

9. How to create workflow? \
   9.2. Navigate to the Actions tab once you enter the repository. \
   GitHub Actions are only available for free if the repository is public. \
   9.3. You should be presented with the option to set up a starter workflow, \
   press the “Set up this workflow” to do it. \
   9.4. You will be presented with a very user-friendly page. \
   It will contain a text-editor right in the browser on the left side. \
   On the right side, you will have access to the marketplace containing pre-built steps. \
   9.5. Also you can create a workflow on you local repository. \
   create the directory .github/workflows/ and file .yml \
   9.6. Firstly, you can use this code for try it. \
   9.7. GitHub will hint you on every step. \
   9.8. When you commit and push the changed configuration \

10. How to run workflow? \
    10.1. Go to 'Actions' Tab \
    10.2. And run workflow. \
    10.3. In the Actions tab again and you should see a job either in Queue or finished. \
    10.4. You can see more in-depth statuses about all the jobs inside the workflow. \
    10.5. Click on the build job to see detailed information and output from each step. \

11. Let’s try using the marketplace
    11.1. Go to github.com/marketplace, “Action” tab.
    11.2. Either search for anything you’re interested in and add it.
    Yes, they do provide us with pre-built configurations to perform almost anything!

11.3. That’s how simple it is to use the marketplace when inserting new actions.
I suggest exploring the marketplace for more actions to perform — GitHub actions are a very powerful tool.

12. That's all I wanted to say about GH Actions.
    You can learn more about in sources I used.
    Thank you for your attention.
