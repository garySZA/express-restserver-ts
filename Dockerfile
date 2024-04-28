FROM node:20.5-alpine as dependencies
WORKDIR /app
COPY package.json ./
RUN yarn install --network-timeout 600000

# #* Etapa de build y testing
FROM node:20.5-alpine as builder
WORKDIR /app
COPY --from=dependencies /app/node_modules ./node_modules
COPY . .
# RUN yarn build
RUN yarn add -D typescript
RUN yarn tsc

# # #* Etapa de ejecución
FROM node:20.5-alpine as prod
EXPOSE 6070
WORKDIR /app
ENV BASE_URL=/api/v1
ENV PORT=8000
COPY --from=dependencies /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

CMD [ "node", "dist/app.js" ]