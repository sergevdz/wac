FROM node:16.14.2

# set working directory
WORKDIR /app

# set dependencies
COPY package.json package.json
COPY ./back/api/package.son package.json
COPY back/api/package.json package.json
COPY back/api/package.json package.json
COPY back/api/package-lock.json package-lock.json

# install dependencies
RUN npm install

# copy source code
COPY back/api/. .

# run development mode
CMD ["npm", "run", "dev"]