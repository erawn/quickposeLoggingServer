#! /bin/bash


# gcloud compute firewall-rules create allow-https --description "https server" --allow tcp:443 --format json
git config --global user.email "erawn65@gmail.com"
git config --global user.name "Eric Rawn"

curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash

export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm

nvm install 16.13.0

nvm use 16.13.0

npm install --global yarn

yarn

sudo apt install lsb-release

sudo apt-get install -y nginx

sudo cp default /etc/nginx/sites-available/default

sudo service nginx restart

sudo apt-get install iptables

yes | curl -fsSL https://packages.redis.io/gpg | sudo gpg --dearmor -o /usr/share/keyrings/redis-archive-keyring.gpg

echo "deb [signed-by=/usr/share/keyrings/redis-archive-keyring.gpg] https://packages.redis.io/deb $(lsb_release -cs) main" | sudo tee /etc/apt/sources.list.d/redis.list

sudo apt-get update

yes | sudo apt-get install redis

sudo mkdir /etc/redis
sudo mkdir /var/redis
sudo mkdir /var/redis/6379

sudo cp ./redis/redis_init_script /etc/init.d/redis_6379

sudo cp ./redis/redis.conf /etc/redis/6379.conf

sudo update-rc.d redis_6379 defaults

sudo chmod +x /etc/init.d/redis_6379

sudo cp /bin/redis-server /usr/local/bin/redis-server
sudo cp /bin/redis-cli /usr/local/bin/redis-cli

sudo /etc/init.d/redis_6379 start

yarn global add pm2

yarn build

yarn server




