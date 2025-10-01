FROM node:20-alpine

# Install Python3, pip3, and ffmpeg for yt-dlp
RUN apk add --no-cache python3 py3-pip ffmpeg

# Install yt-dlp globally (allow breaking system packages for Alpine)
RUN pip3 install --break-system-packages yt-dlp

# Set working directory
WORKDIR /home/feddiblogger/ttmp3.io

# Copy package files
COPY package*.json ./

# Install Node dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Build Next.js app
RUN npm run build

# Expose port
EXPOSE 3000

# Start the app
CMD ["npm", "start"]
