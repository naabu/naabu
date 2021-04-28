FROM cypress/base:14
COPY . /var/www/
WORKDIR /var/www/svelte/
RUN npm install; \
    npm install -g \ 
        npm \
        firebase-tools; \
    npm install 
EXPOSE 3000
CMD ["tail", "-f", "/dev/null"]
