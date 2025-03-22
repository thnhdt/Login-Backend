Sequelize:

Sequelize-CLI init:
    -npx sequelize-cli init
Create models
    -npx sequelize-cli model:generate --name User --attributes firstName:string,lastName:string,email:string
Migrations:
    create:
    -npx sequelize-cli migration:generate --name create-users
    undo:
    -npx sequelize-cli db:migrate:undo:all --to XXXXXXXXXXXXXX-create-posts.js

Running migrations (add to database):
    -npx sequelize-cli db:migrate

Seed (insert sample data):
    create:
    -npx sequelize-cli seed:generate --name demo-user
    running:
    -npx sequelize-cli db:seed:all
    undo:
    -npx sequelize-cli db:seed:undo(:all) (--seed name-of-seed-as-in-data)


    