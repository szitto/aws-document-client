#!/bin/bash

# Select promt
PS3='Select your version increment: '
OPTIONS=("major" "minor" "patch" "cancel")
select opt in "${OPTIONS[@]}"; do
  case "$opt,$REPLY" in
    *) VERSION_INCREMENT=$opt; break ;;
    cancel,*|*,cancel) exit 0 ;;
  esac
done

# Checkout master
git checkout master
git pull

# Bump the version in package json and stash it
NEW_VERSION=$(npm version --no-git-tag-version $VERSION_INCREMENT)
git stash save "$NEW_VERSION stash"

# Checkout release branch, and apply version changes
git checkout -b "$NEW_VERSION"
git stash apply

# Remove unnecessary files
ls | grep -v -E "(src|README.md|package.json|node_modules)" | xargs rm -rf
rm -f .eslintrc.js

# Create version commit
git add -A
git commit -m "$NEW_VERSION release"
git tag "$NEW_VERSION"

# Push a tag for the release
git push --tags

# After the release go back to master and push package version changes
git checkout master
git stash pop
git add package*.json
git commit -m "$NEW_VERSION is released"
git push
