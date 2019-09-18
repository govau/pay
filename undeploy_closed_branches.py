#!/usr/bin/env python3

import sys
import os
import subprocess

feat_separator = '-f-'

deployable_apps = set(
    subprocess.run(
        ['make', '-s', '-C', '../', 'list-deploys'],
        encoding='utf-8',
        capture_output=True
        ).stdout.splitlines()
    )

def run_subprocess(command):
    return subprocess.run(
            command,
            encoding='utf-8',
            capture_output=True,
            check=True
        ).stdout.splitlines()

def orphaned(branches, entities):
    for entity in entities:
        if feat_separator not in entity:
            continue

        [ app, branch ] = entity.split(feat_separator)

        if app in deployable_apps and branch not in branches:
            yield entity

def feature_branches():
    yield from run_subprocess(['make', '-s', 'list-branches'])

def deployed_apps():
    yield from run_subprocess(['make', '-s', 'list-apps'])

def deployed_services():
    yield from run_subprocess(['make', '-s', 'list-services'])

if __name__ == '__main__':
    branches = set(feature_branches())
    orphaned_services = orphaned(branches, deployed_services())
    orphaned_apps     = orphaned(branches, deployed_apps())

    for entity in orphaned_apps:
        subprocess.run(['make', 'undeploy-app-{}'.format(entity)])

    for service in orphaned_services:
        subprocess.run(['make', 'undeploy-service-{}'.format(service)])
