#podman run --name mariadb -v $(pwd)/data:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=password -p 3306:3306 -d docker.io/library/nginx
podman run --name webapp \
           --pod chat-service \
           -v $(pwd)/dist/chat-client/browser:/usr/share/nginx/html \
           -v $(pwd)/script/conf.d:/etc/nginx/conf.d \
           -d docker.io/library/nginx