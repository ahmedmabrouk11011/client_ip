# Build, Push, and Deploy

This GitHub Actions workflow is designed to automate the process of building a Docker image, pushing it to Amazon Elastic Container Registry (ECR), and deploying the application to an Amazon Elastic Kubernetes Service (EKS) cluster using Helm.

## Workflow Overview

- **Build**: Constructs the Docker image and tags it with the current commit SHA.
- **Push**: Uploads the tagged image to a specified repository in Amazon ECR.
- **Deploy**: Utilizes Helm to deploy the application to an Amazon EKS cluster.

## Prerequisites

- A Dockerfile located at the root of the repository.
- An existing Amazon EKS cluster.
- A Helm chart located in the `./chart` directory.
- Configured GitHub Secrets for AWS credentials, ECR repository, and other environment-specific variables.

## Usage

To trigger this workflow, push changes to branches matching `dev*`. The workflow ignores changes to `README.md`.

## Environment Variables

To create a new deployment, add a new GitHub environment and define the following secrets:

- `AWS_ACCESS_KEY_ID`: Your AWS access key ID.
- `AWS_SECRET_ACCESS_KEY`: Your AWS secret access key.
- `AWS_REGION`: The AWS region where your resources are located.
- `ECR_REPOSITORY`: The name of your ECR repository.
- `EKS_CLUSTER`: The name of your EKS cluster.
- `ASSUME_ROLE_ARN`: The ARN of the role to assume for EKS operations.
- `DB_PASSWORD`: The database password (if applicable).
- `DB_HOST`: The database host (if applicable).
- `ENVIRONMENT`: The target environment for the deployment (e.g., `dev`, `prod`).

## Workflow Steps

1. **Checkout Code**: Fetches the latest code from the repository.
2. **Configure AWS Credentials**: Sets up AWS credentials using GitHub Secrets.
3. **Login to Amazon ECR**: Authenticates with Amazon ECR.
4. **Build, Tag, and Push Image**: Builds the Docker image, tags it with the commit SHA, and pushes it to ECR.
5. **Update Helm Dependencies**: Updates the dependencies for the Helm chart.
6. **Deploy Helm Chart**: Deploys the Helm chart to the EKS cluster with the updated image.
7. **Clear Local Docker Images**: Removes local Docker images to free up space.

For more detailed instructions on configuring and using this workflow, refer to the GitHub Actions documentation.

## Contributing

Contributions to this workflow are welcome. Please ensure that your changes are well-documented and tested before submitting a pull request.

## License

This workflow is released under the MIT License.
