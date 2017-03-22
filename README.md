# Chell [![Build Status](https://travis.ibm.com/bdu/chell.svg?token=CCLjK5gsaLWyxhCwwcrs&branch=master)](https://travis.ibm.com/bdu/chell)

Global course catalog service.

## Bootstrap

If the image specified in `docker-compose.yml` isn't available, you must
bootstrap the project with the following commands.

```shell
REPO=apset-docker.artifactory.swg-devops.com/bigdatauniversity/course-dev.chell \
  TAG=latest \
  docker-compose -f ci/docker-compose.yaml build

docker-compose run chell npm install
docker-compose down
```

The first command will build the image, and the second one will install the
NPM packages locally for development.

## Cheatsheet

*   Development web server.

    ```shell
    docker-compose up; docker-compose down
    ```

*   Development console.

    ```shell
    docker-compose run --service-ports chell ash; docker-compose down
    ```

*   Lint.

    ```shell
    docker-compose run chell npm run lint; docker-compose down
    ```

*   Run test suite.

    ```shell
    docker-compose run chell npm test; docker-compose down
    ```

## License

Please refer to [LICENSE](LICENSE).

## Authors

*   Partner Ecosystem Team, IBM Digital Business Group <mailto:imcloud@ca.ibm.com>
