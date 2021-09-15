FROM node:14
RUN apt-get update; \
    apt-get install -y \
    default-jre; 
COPY . /var/www/
WORKDIR /var/www/svelte/
USER node
RUN npm install; \
    npm install -g \ 
        npm \
        firebase-tools; \
    npm install; \
    echo "fs.inotify.max_user_watches=2097152" \ 
    | tee -a /etc/sysctl.conf;
EXPOSE 3000
RUN chown -R node /var/www/svelte/node_modules
ENV PATH /var/www/svelte/node_modules/.bin:$PATH
CMD ["tail", "-f", "/dev/null"]
