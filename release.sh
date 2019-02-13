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

# Checkout master and increment the version
git checkout master
npm version $VERSION_INCREMENT -m "v%s is released"
git push
git push --tags
