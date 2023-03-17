#! /bin/bash
sudo systemctl start nginx

sudo /etc/init.d/redis_6379 start

yarn build

pm2 kill

yarn server