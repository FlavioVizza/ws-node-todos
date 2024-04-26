# Usa un'immagine base di Node.js
FROM node:latest

# Imposta la directory di lavoro all'interno del container
WORKDIR /usr/src/app

# Copia i file package.json e package-lock.json
COPY package*.json ./

# Installa le dipendenze
RUN npm install

# Copia il codice sorgente
COPY . .

# Esponi la porta su cui l'applicazione Express ascolterà le richieste
EXPOSE 3000

# Comando per avviare l'applicazione
CMD ["node", "server.js"]