FROM node:14
RUN apt-get update; \
    apt-get install -y \
    default-jre; 
COPY . /var/www/
WORKDIR /var/www/svelte/
USER node
RUN chown -R node /usr/local/lib/node_modules; \
    npm install; \
    npm install -g \ 
        npm \
        firebase-tools; \
    npm install; \
    echo "fs.inotify.max_user_watches=2097152" \ 
    | tee -a /etc/sysctl.conf; \
    chown -R node /var/www/svelte/node_modules;
EXPOSE 3000
ENV PATH /var/www/svelte/node_modules/.bin:$PATH
CMD ["tail", "-f", "/dev/null"]
