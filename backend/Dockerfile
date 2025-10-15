# Use Node.js LTS (lightweight image)
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./


RUN npm install --only=production


COPY . .

EXPOSE 5001


CMD ["node", "src/index.js"]
