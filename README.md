# Shipmnts-Assignment-Stackoverflow

### Backend Option 1: StackOverFlow Clone
### List of APIs needed:
Create User: A user can register himself on the system,
Create Questions: User can create a Questions,
Update Questions: User can update the Questions,
Delete Questions: User can delete the Questions,
All Questions: List of the all questions,
Votes: Implementing a voting system (upvotes/downvotes) for questions and answers,
Comments: Commenting system for questions and answers,
Bonus: Search, Sorting questions

## Project Documentation:
1. MVC Structure is followed for writing quality code.
We have various directories. config folder contains configuration files.
middlewares
2. We have 3 models one for user details, one for all questions that contains all answers in form of an array and one for storing all answers.
3. Once user register using email and password, user details are stored in user_details where password is stored in encrypted form.
4. user can then register using email and password, a JWT token is generated to keep track of user
5. further we have created routes for each feature required for our app and dedicated api functions are created in controllers folder which uses various models described in models folder