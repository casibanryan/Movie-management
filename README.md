# Movie-management

Build a Movie Management Platform that allows users to perform CRUD (Create, Read, Update, Delete) operations on movies. The system should consist of a PHP laravel
backend and a frontend (choose one: (Preferred)Angular, React, or Vue). The frontend and
backend must communicate over a REST API.

# Tech stack used

PHP (Laravel)
Vue
Docker
Mysql
Redis

# Requirements

PHP
Node js
Docker
WSL
Composer
laravel

# copy guide

git clone https://github.com/casibanryan/Movie-management.git
cd Movie-management

# ENV

for .envs setup I include it to git for easy setup and testing purpose

# run client guide

cd client
npm install && npm run dev

# run api guide

cd api
composer install

# for easy command

alias sail='sh $([ -f sail ] && echo sail || echo vendor/bin/sail)'

sail build --no-cache
sail up -d

sail artisan storage:link

# initialize DB

sail artisan migrate:fresh

# generate default user

sail artisan db:seed

# default user credentials

email: johndoe@gmail.com
password: password

# Bugs Encounter

1. file permission issue in logs during building (docker)
2. bug on HLS generation, current php and package is not compatible

# if counter please run this commands on docker

mkdir -p /var/www/html/storage/logs
chmod -R 777 /var/www/html/storage

## # optional (run)

touch /var/www/html/storage/logs/laravel.log
chmod 666 /var/www/html/storage/logs/laravel.log
