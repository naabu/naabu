FROM cypress/base:latest
COPY ./functional-tests /tests
WORKDIR /tests
RUN npm ci
CMD ["tail", "-f", "/dev/null"]
