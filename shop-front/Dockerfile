FROM --platform=$BUILDPLATFORM node:18 AS builder
WORKDIR /app
COPY package.json package-lock.json ./
ENV REACT_APP_API_URL=http://localhost
# ENV REACT_APP_API_URL=http://localhost:8080 # For Kubernetes
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
# COPY default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build /usr/share/nginx/html
COPY ./default.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
