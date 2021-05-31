FROM node:14
RUN apt-get update; \
    apt-get install -y \
    default-jre; 
COPY . /var/www/
WORKDIR /var/www/svelte/
RUN npm install; \
    npm install -g \ 
        npm \
        firebase-tools; \
    npm install; \
    echo "fs.inotify.max_user_watches=2097152" \ 
    | tee -a /etc/sysctl.conf;
EXPOSE 3000
USER node
CMD ["tail", "-f", "/dev/null"]
