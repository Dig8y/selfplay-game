# Digby Take Home Task
## Set Up

  

    npm install -g typescript
  
    npm install -g ts-node

### env keys

    openAIKey="..."

 

  ## Running

    ts-node index.ts

  
  



  

### What main steps will there be?
    

-   Step 1: Host will generate topic
    
-   Step 2: Guesser will question the host
    
-   Step 3: Host will evaluate the question in terms of the topic.
    
-   Step 4: Store the host agent's evaluation of each question to use as the Guessing agents context.
    
-   Step 5: Loop until 20 questions asked / question is evaluated as guessing the topic.
    

### How will we get the agents to interact?
    

-   Host agent will interact with the guessing agent when evaluating the question.
    
-   Guessing agent will interact with the host agent when evaluation feedback is received.
    

###  What context does each agent have? 
    

-   The Host agent has the context of their generated topic.
    
-   The Guessing agent has the context of the evaluated history of messages.
    

### What pieces could you keep static at first to simplify things?
    

-   Not generating the topic.
    

-   Error handling
    

-   Errors coming from return type of open ai api, despite specifying response_format.
    
-   Parsing errors are handled by zod.
    

### will you break up each player into multiple “sub-agents”?
    

-   One host agent: generate topic, evaluating questions in relation to generated topic
    

  

## Reliability:

  

### How can we reliably chain together the agent's “actions”?
    

-   Ensuring data is returned and parsed properly.
    

  

## Evaluation:

  

### How good are your agents at playing the game? How might we measure this?
    

-   They are pretty good, might have to ensure that topics are made to be more hard. Can evaluate this by seeing how many questions the guessing agent takes to correctly guess / how many times it doesnt guess correctly
    

###    How often do things fail? What kind of failures are there?
   
-   Not often at all / open ai api returns incorrect data
    

###  How can we make the task easier or harder? How might we measure this?
    

-   Make it easier by not requiring the topic to be made / topic examples within topic generation prompt are easier.
    
-   Make it harder by reducing question size / harder topics / building out front end / adding multiple guessing agents into the game / question size is based on topic.
    

  

###  How can you organise different experiments? For example, if you prompt one of the agents slightly differently, what’s the impact and how will the results be organised?
    

-   Build an evaluation model that evaluates output.
    

### Can you parallelize to make experiments faster?
    

-   Run it on a async service such as inngest
    

### How else can you make things more efficient and easy to use?
    

-   Connect results to a db, with a dashboard after running parallelized experiments with evaluations.
    
-   Use SQL modelling services such as metabase to plot evaluation results.
    

  

### Issues I encountered + resolution:
    

-   Was going to ship web app => decided against, not needed for what was being evaluated.
    
-   Attempted to write in python for first time - Ï couldn't get open ai pip package to install globally to converted to more familiar typescript.
    
-   Had temperature for prompts on 0 was wondering why the topic was guitar everytime :D:D:D:D:D
    

###  What future work would you explore, perhaps beyond prompt engineering?
    

-   Adding a rag layer for all topics / fine tune accurate question evals based on topics
