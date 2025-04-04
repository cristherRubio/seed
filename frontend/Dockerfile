# Stage 1: Build the app
FROM node:18-alpine AS builder

WORKDIR /app

# Copy dependency files first (cache layer)
COPY package*.json ./
COPY tsconfig*.json ./

RUN npm install

# Copy the rest of the app
COPY . .

ARG BACKEND_API_URL
ENV BACKEND_API_URL=$BACKEND_API_URL

# Build the app with Vite
RUN npm run build

# Stage 2: Serve the built app with a static server
FROM node:18-alpine

WORKDIR /app

RUN npm install -g serve

COPY --from=builder /app/dist ./dist

EXPOSE 3000

CMD ["serve", "-s", "dist", "-l", "3000"]
