# Per crear una imatge: 
# amb el servidor NGINX per servir els fitxers estàtics de front
# Exposa el port 80


# Per crear la imatge: docker build -t server_nginx . 
# Per executar el contenidor: docker run -p 80:80 -d server_nginx
# Per veure els logs: docker logs <container_id>
# O directament executar-lo en mode interactiu (-it enlloc de  -d)) : 
# docker run -it -p 80:80 server_nginx

FROM nginx:1.25.3-alpine


# Set the working directory to /app
WORKDIR /usr/share/nginx/html

# Copiem el contingut del directori /dist a l'interior del working directory 
COPY /dist .

#expose port 8080 to the outside world
EXPOSE 80



