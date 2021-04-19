FROM cypress/base:14
COPY . /var/www/
WORKDIR /var/www/sveltekit/
RUN npm install; \
    npm install -g npm; \
    npm install 
EXPOSE 3000
CMD ["tail", "-f", "/dev/null"]
