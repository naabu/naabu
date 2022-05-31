FROM mcr.microsoft.com/playwright:v1.22.2-focal
RUN apt-get update; \
    apt-get install -y \
    curl \
    unzip \
    xvfb \
    libxi6 \
    libgconf-2-4 \
    wget \
    libu2f-udev;
RUN npx playwright install chrome && \
    npm set audit false
WORKDIR /var/www/
RUN npm install @playwright/test@1.22.2
CMD ["tail", "-f", "/dev/null"]
