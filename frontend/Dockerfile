FROM node:20

# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy frontend code
COPY . .

# Expose port 3000
EXPOSE 3000

# Start React App
CMD ["npm", "start"]