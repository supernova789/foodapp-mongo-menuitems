# Stage 0, "build-stage", based on Node.js, to build and compile the frontend
FROM node:10.16.3
WORKDIR /app
COPY . .
# Install app dependencies
RUN npm install
EXPOSE 3000
CMD [ "node", "server.js" ]