# Git

> This cheat sheet summarizes commonly used Git command line instructions for quick reference.

Category: Linux Command

## Getting Started

### Create a Repository

Create a new local repository

```shell
$ git init [project name]

```

Clone a repository

```shell
$ git clone git_url

```

Clone a repository into a specified directory

```shell
$ git clone git_url my_directory

```

### Make a change

Show modified files in working directory, staged for your next commit

```shell
$ git status

```

Stages the file, ready for commit

```shell
$ git add [file]

```

Stage all changed files, ready for commit

```shell
$ git add .

```

Commit all staged files to version history

```shell
$ git commit -m "commit message"

```

Commit all your tracked files to version history

```shell
$ git commit -am "commit message"

```

Discard changes in working directory which is not staged

```shell
$ git restore [file]

```

Unstage a staged file or file which is staged

```shell
$ git restore --staged [file]

```

Unstage a file, keeping the file changes

```shell
$ git reset [file]

```

Revert everything to the last commit

```shell
$ git reset --hard

```

Diff of what is changed but not staged

```shell
$ git diff

```

Diff of what is staged but not yet committed

```shell
$ git diff --staged

```

Apply any commits of current branch ahead of specified one

```shell
$ git rebase [branch]

```

### Configuration

Set the name that will be attached to your commits and tags

```shell
$ git config --global user.name "name"

```

Set an email address that will be attached to your commits and tags

```shell
$ git config --global user.email "email"

```

Enable some colorization of Git output

```shell
$ git config --global color.ui auto

```

Edit the global configuration file in a text editor

```shell
$ git config --global --edit

```

### Working with Branches

List all local branches

```shell
$ git branch

```

List all branches, local and remote

```shell
$ git branch -av

```

Switch to my_branch, and update working directory

```shell
$ git checkout my_branch

```

Create a new branch called new_branch

```shell
$ git checkout -b new_branch

```

Delete the branch called my_branch

```shell
$ git branch -d my_branch

```

Merge branchA into branchB

```shell
$ git checkout branchB
$ git merge branchA

```

Tag the current commit

```shell
$ git tag my_tag

```

### Observe your Repository

Show the commit history for the currently active branch

```shell
$ git log

```

Show the commits on branchA that are not on branchB

```shell
$ git log branchB..branchA

```

Show the commits that changed file, even across renames

```shell
$ git log --follow [file]

```

Show the diff of what is in branchA that is not in branchB

```shell
$ git diff branchB...branchA

```

Show any object in Git in human-readable format

```shell
$ git show [SHA]

```

### Synchronize

Fetch down all the branches from that Git remote

```shell
$ git fetch [alias]

```

Merge a remote branch into your current branch to bring it up to date

```shell
$ git merge [alias]/[branch]
# No fast-forward
$ git merge --no-ff [alias]/[branch]
# Only fast-forward
$ git merge --ff-only [alias]/[branch]

```

Transmit local branch commits to the remote repository branch

```shell
$ git push [alias] [branch]

```

Fetch and merge any commits from the tracking remote branch

```shell
$ git pull

```

Merge just one specific commit from another branch to your current branch

```shell
$ git cherry-pick [commit_id]

```

### Remote

Add a git URL as an alias

```shell
$ git remote add [alias] [url]

```

Show the names of the remote repositories you've set up

```shell
$ git remote

```

Show the names and URLs of the remote repositories

```shell
$ git remote -v

```

Remove a remote repository

```shell
$ git remote rm [remote repo name]

```

Change the URL of the git repo

```shell
$ git remote set-url origin [git_url]

```

### Temporary Commits

Save modified and staged changes

```shell
$ git stash

```

List stack-order of stashed file changes

```shell
$ git stash list

```

Write working from top of stash stack

```shell
$ git stash pop

```

Discard the changes from top of stash stack

```shell
$ git stash drop

```

### Tracking path Changes

Delete the file from project and stage the removal for commit

```shell
$ git rm [file]

```

Change an existing file path and stage the move

```shell
$ git mv [existing-path] [new-path]

```

Show all commit logs with indication of any paths that moved

```shell
$ git log --stat -M

```

### Ignoring Files

```
/logs/*

# "!" means don't ignore
!logs/.gitkeep

/# Ignore Mac system files
.DS_store

# Ignore node_modules folder
node_modules

# Ignore SASS config files
.sass-cache

```

A.gitignorefile specifies intentionally untracked files that Git should ignore

## Git Tricks

### Rename branch

- Renamedtonew_name$ git branch -m <new_name>
- Pushand reset$ git push origin -u <new_name>
- Deleteremote branch$ git push origin --delete <old>{.marker-timeline}

#### Renamedtonew_name

```shell
$ git branch -m <new_name>

```

#### Pushand reset

```shell
$ git push origin -u <new_name>

```

#### Deleteremote branch

```shell
$ git push origin --delete <old>

```

### Log

Search change by content

```shell
$ git log -S'<a term in the source>'

```

Show changes over time for specific file

```shell
$ git log -p <file_name>

```

Print out a cool visualization of your log

```shell
$ git log --pretty=oneline --graph --decorate --all

```

### Branch

List all branches and their upstreams

```shell
$ git branch -vv

```

Quickly switch to the previous branch

```shell
$ git checkout -

```

Get only remote branches

```shell
$ git branch -r

```

Checkout a single file from another branch

```shell
$ git checkout <branch> -- <file>

```

### Rewriting history

Rewrite last commit message

```shell
$ git commit --amend -m "new message"

```

Amend the latest commit without changing the commit message.

```shell
$ git commit --amend --no-edit

```

See also:Rewriting history

### Git Aliases

```cmd
git config --global alias.co checkout
git config --global alias.br branch
git config --global alias.ci commit
git config --global alias.st status

```

See also:More Aliases

## Advanced Git

### Submodules

Create a new submodule within your repository:

```shell
$ git submodule add <repository_url> <path>

```

Clone a repository and initialize its submodules:

```shell
$ git clone --recursive <repository_url>

```

Update all the submodules in your repository to the latest commit of their respective branches:

```shell
$ git submodule update

```

Pull the latest changes from the remote repositories of the submodules and update them in your main repository:

```shell
$ git submodule update --remote

```

Remove a submodule from your repository:

```shell
$ git submodule deinit <path>
$ git rm <path>
$ git commit -m "Removed submodule"

```

### Cherry-picking

Cherry-picking allows you to apply a specific commit from one branch to another branch.

```shell
$ git cherry-pick <commit_hash>

```

### Reflog

Display the reflog, showing the history of HEAD and branch movements:

```shell
$ git reflog

```

Find the hash of the lost commit or branch using the reflog and then checkout to that hash to restore it:

```shell
$ git checkout <commit_or_branch_hash>

```

