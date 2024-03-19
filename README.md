# Client IP Task Demo

The task scope is to create a simple web application that has two publicly available endpoints:

- `/client-ip`: This endpoint will get the client IP address and store it in a PostgreSQL database.
- `/client-ip/list`: This endpoint will list down all the IP addresses stored in the database.

The project is using the following technologies:

- **Node.js**: A JavaScript runtime environment for building scalable web applications.
- **Express**: A web framework for Node.js that provides features for web and mobile applications.
- **Docker**: A platform for building, running, and sharing applications using containers.
- **Docker Compose**: A tool for defining and running multi-container applications with Docker.
- **PgAdmin**: A web-based administration and development platform for PostgreSQL databases.
- **PostgreSQ**L: An open-source relational database management system.

## Prerequisites

To run this application on your local machine, you will need to have the following installed:

- **Git**: A distributed version control system for tracking changes in source code.
- **Docker**: A platform for building, running, and sharing applications using containers.
- **Docker Compose**: A tool for defining and running multi-container applications with Docker.

## Installation

To install this application, follow these steps:

- Clone this repository using the command:

```bash
git clone https://github.com/ahmedmabrouk11011/client_ip.git
```

- Change the current directory to the project directory using the command:

```bash
cd client_ip
```

- Run the application using the command:
```bash
docker-compose up -d
```

This will build the images and run the containers for the app and the database. 

It will also create a network for them to communicate and a volume for the database data to persist.

## Usage
To use this application, you can access the following URLs:

- `http://localhost:3000/`: This will return a welcome message.
- `http://localhost:3000/client-ip`: This will get the client IP address and store it in the database. It will return a JSON object with the id and the client IP address.
- `http://localhost:3000/client-ip/list`: This will list down all the IP addresses stored in the database. It will return a JSON array with the id and the client IP address for each row.
- `http://localhost:3000/client-ip/delete-all`: This will delete all the IP addresses from the database. It will return a success message.

You can also access the PgAdmin interface at `http://localhost:5433/` to manage the database. The default credentials are:

- Email: `admin@admin.com`
- Password: `admin`

To connect to the database, you will need to create a new server with the following details:

- Name: `task_db`
- Host: `postgres`
- Port: `5432`
- Username: `postgres`
- Password: `postgres`

The database name is `task_db` and the table name is `client_ips`.

## Stopping
To stop the application, run the command:
```bash
docker-compose down
```

This will stop and remove the containers, the network, and the anonymous volumes.
