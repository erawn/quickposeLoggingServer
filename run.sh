#! /bin/bash
sudo systemctl start nginx

sudo /etc/init.d/redis_6379 start

pm2 kill

pm2 start -f /home/erawn65/quickposeLoggingServer/dist/index.jsx 