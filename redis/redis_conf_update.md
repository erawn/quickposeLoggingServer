sudo cp redis_init_script /etc/init.d/redis_6379
sudo update-rc.d redis_6379 defaults

sudo cp redis.conf /etc/redis/6379.conf
sudo /etc/init.d/redis_6379 start



gcloud compute scp quickpose:/home/erawn65/test.txt ./test.txt