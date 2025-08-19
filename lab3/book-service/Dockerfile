# Use an official Python runtime as a parent image
FROM python:3.9

# Set the working directory in the container
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . /app

# DEbug the /app content
RUN ls -la /app 

# Install any needed packages specified in requirements.txt
RUN pip install --no-cache-dir -r requirements.txt
RUN pip install gunicorn

# Make port 5005 available to the world outside this container
EXPOSE 5005

# Define environment variable
ENV FLASK_PORT="5005"
ENV FLASK_HOST="0.0.0.0"
ENV FLASK_DEBUG="True"

CMD ["python", "api.py"]