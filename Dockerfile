# Image de base
FROM ubuntu:16.04
RUN useradd jh -s /bin/bash -m -G sudo && chpasswd jh:jh

# Installation des paquets
RUN apt-get update && apt-get install -y sudo git wget curl nodejs npm openjdk-8-jdk && \
mkdir /home/jh/data \
&& rm -rf var/lib/apt/list/*

# Ajout des fichiers utilitaires dans le container
COPY . /home/jh/data

# Mise à jour de Nodejs
RUN ln -s /usr/bin/nodejs /usr/bin/node \
&& npm install n -g && n stable

# Installation de jhipster et jhispster-uml
RUN npm install -g yo yarn \
generator-jhipster  && \
yarn global add jhipster-uml

# Set repository permissions
RUN chown -R jh:sudo /home/jh/data \
/usr/lib \
/usr/local

# Paramètres de l'environnement de travail
USER jh
WORKDIR "/home/jh/data"
ENV PATH $PATH:/usr/bin:/home/data/bin:/usr/local/share/.config/yarn/global/node_modules/.bin
EXPOSE 8080 9000 3001
CMD ["/bin/bash"]
