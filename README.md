## Setting up development environment

First you'll need to ensure that you have Node.js installed

Clone the repository

```
git clone https://gitlab.com/cs-department-ecu/csci-4230-spring-2024/nba-or-sports-analytica-app/dunkdata.git
```

Install the dependencies
```
npm install
```

Download Expo from either the app Store or Google Play Store

Run: 
```
npx expo
```
This will start up development server on your local machine. All thats left is to scan the QR code generated in your terminal

## Pulling the Latest Version

To ensure you are working with the most up-to-date version of the project, follow these steps to pull the latest changes from the repository:

1. Open a terminal window.

2. Navigate to the project directory using the `cd` command:

```
cd dunkdata
```

3. Pull the latest changes from the remote repository using the following command:
```
git pull origin master
```
This command pulls the latest changes from the `master` branch of the remote repository (`origin`) and merges them into your local repository.

## Committing Working Changes

Once you've made changes to the project and you're ready to save those changes to the repository, follow these steps:

1. Check the status of your changes by running:
```
git status
```
This command displays which files have been modified, added, or deleted.

2. Add the files you want to commit to the staging area using:
```
git add <file1> <file2> ...
```
Alternatively, you can use `git add .` to add all modified files.

3. Commit your changes with a descriptive commit message:

```
git commit -m "Your descriptive commit message here"
```
Replace `"Your descriptive commit message here"` with a brief summary of the changes you made.

4. Push your changes to the remote repository:
```
git push origin main
```
This command sends your committed changes to the `main` branch of the remote repository (`origin`).
