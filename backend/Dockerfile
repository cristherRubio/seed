FROM python:3.13-slim

# Environment config
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Install build dependencies (needed for asyncpg, psycopg2, etc.)
RUN apt-get update && apt-get install -y \
    gcc libpq-dev curl && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /app

# Copy and install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the app code
COPY . .

# Initialize
COPY start.sh /app/start.sh
RUN chmod +x /app/start.sh
CMD ["/app/start.sh"]

# Expose FastAPI default port
EXPOSE 8000

# Start the app with Uvicorn
CMD ["/app/start.sh"]
