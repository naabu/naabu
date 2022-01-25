FROM node:14 
COPY package.json /usr/local/package.json
COPY package-lock.json /usr/local/package-lock.json
RUN \
  apt-get update && \
  apt-get install -y \
    ruby-full \
    build-essential \ 
    zlib1g-dev && \
  gem install jekyll bundler && \
  chmod -R 777 /usr/local/ 
USER node
RUN npm ci --global
ENV PATH /usr/local/node_modules/.bin:$PATH
CMD ["tail", "-f", "/dev/null"]
EXPOSE 3000
