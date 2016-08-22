#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "postgres"  <<-EOSQL
    CREATE USER xavi WITH PASSWORD 'Houston';
    CREATE DATABASE Cookbook;
    GRANT ALL PRIVILEGES ON DATABASE Cookbook TO xavi;
EOSQL