#!/bin/bash

# Automated deploy script with Circle CI.

# Exit if any subcommand fails.
set -e

# Variables
ORIGIN_URL=`git config --get remote.origin.url`

echo "Started deploying"

# Checkout gh-pages branch (or master, if on a username.github.io repo)
if [ `git branch | grep gh-pages` ]
then
  git branch -D gh-pages
fi
git checkout -b gh-pages

# Build site.
webpack

# Delete and move files.
find . -maxdepth 1 ! -name 'build' ! -name '.git' ! -name '.gitignore' -exec rm -rf {} \;
mv build/* .
rm -R build/

# Push to gh-pages.
git config user.name "Hofftech CI Bot"
git config user.email "ci@hoff.tech"

git add -fA
git commit --allow-empty -m "$(git log -1 --pretty=%B) [ci skip]"
# push to gh-pages branch (or master, if on a username.github.io repo)
git push -f git@github.com:kenhoff/cashflow gh-pages

# Move back to previous branch.
git checkout -

echo "Deployed Successfully!"

exit 0
