FROM cypress/base:14.16.0
RUN apt-get update; \
    apt-get install -y \
    default-jre \
    tmux;
COPY . /var/www/
WORKDIR /var/www/svelte/
RUN npm install; \
    npm install -g \ 
        npm \
        firebase-tools; \
    npm install 
EXPOSE 3000
USER node
CMD ["tail", "-f", "/dev/null"]
