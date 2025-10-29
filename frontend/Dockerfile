FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 5173

ENV NODE_OPTIONS="--max-old-space-size=384"
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
