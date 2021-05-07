FROM cypress/base:14
RUN apt-get update; \
    apt-get install -y default-jre;
COPY . /var/www/
WORKDIR /var/www/svelte/
RUN npm install; \
    npm install -g \ 
        npm \
        pnpm \
        firebase-tools; \
    npm install 
EXPOSE 3000
USER node
CMD ["tail", "-f", "/dev/null"]
