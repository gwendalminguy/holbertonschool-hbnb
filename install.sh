#!/bin/bash

chmod u+x run.sh
mkdir -p part3/instance
touch part3/instance/development.db

DATABASE=$(realpath ./part3/instance/development.db)
SQL=$(which sqlite3)
CREATION=(./part3/scripts/table_creation.sql)
INSERTION=(./part3/scripts/data_insertion.sql)

$SQL $DATABASE < $CREATION && $SQL $DATABASE < $INSERTION
