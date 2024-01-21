This is our Hackathon project for nwHacks 2024!

Here is the link to our repository: https://github.com/johnny-581/Hackathon-Project

# This is how to commit your changes to git

## Before you make any changes:
make sure you pull the latest changes from the remote repository:  
```
git pull origin main
```
Then create and swich to a new branch. You must make your changes in this new branch, so that later it can be reviewed and merged into the main branch:
```
git checkout -b <branch_name>
```
Replace <branch_name> with the name you wish to give to your new branch.  
You can swich between the main branch and your branch using this command:
```
git checkout <branch_name>
```

## Regularly stage, commit, and push your changes
```
git add .
git commit -m "Your commit message"
git push origin <branch_name>
```
Replace "Your commit message" with a brief, informative description of the changes included in the commit.
