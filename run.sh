#! /bin/bash
sudo systemctl start nginx

sudo /etc/init.d/redis_6379 start

pm2 kill

cd /home/erawn65/quickposeLoggingServer && yarn && yarn build && yarn server