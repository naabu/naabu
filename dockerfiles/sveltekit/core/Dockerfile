FROM node:14 
COPY package.json /usr/local/package.json
COPY package-lock.json /usr/local/package-lock.json
RUN chmod -R 777 /usr/local/
USER node
RUN npm ci --global && \
  npm set audit false
ENV PATH /usr/local/node_modules/.bin:$PATH
CMD ["tail", "-f", "/dev/null"]
EXPOSE 3000
