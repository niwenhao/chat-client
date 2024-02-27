#podman run --name mariadb -v $(pwd)/data:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=password -p 3306:3306 -d docker.io/library/nginx
podman run --name webapp \
           -v $(pwd)/dist/chat-client/browser:/usr/share/nginx/html \
           -v $(pwd)/script/conf.d:/etc/nginx/conf.d \
           --add-host=api-server:172.19.30.79 \
           --rm -p 8080:80 -d docker.io/library/nginx