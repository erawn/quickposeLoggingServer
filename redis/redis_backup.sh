#!/bin/bash
rdb_file="/var/redis/6379/dump.rdb"
redis_cli="/usr/bin/redis-cli"

DIR=`date +%d-%m-%y`
BACKUPS_FOLDER=~/redis_backups
mkdir -p $BACKUPS_FOLDER
DEST=$BACKUPS_FOLDER/$DIR
mkdir -p $DEST

echo save| $redis_cli

cp $rdb_file $DEST

# echo FLUSHALL| $redis_cli

exit 1