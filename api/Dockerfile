FROM --platform=linux/amd64 node:20-alpine

# Create app directory
WORKDIR /home

# Install app dependencies
COPY package*.json ./

# Building for a production
RUN npm ci --only=production

# To migrate database changes we need `knex` cli
RUN npm i -g knex
# Bundle app source

COPY . .
EXPOSE 3000
CMD ["node", "index.js"]