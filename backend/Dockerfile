FROM python:3.12.6-slim

# Set environment variables
ENV DEBUG=True
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Set working directory 
WORKDIR /app

# Install dependencies for PostgreSQL
RUN apt-get update && apt-get install -y libpq-dev && apt-get clean

# Install dependencies
COPY requirements.txt .
RUN pip install -r requirements.txt

# Copy backend code
COPY . .

# Expose port 8000
EXPOSE 8000

# commmand to run the application
CMD ["sh", "-c", "python manage.py migrate && python manage.py runserver 0.0.0.0:8000"]