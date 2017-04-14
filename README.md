[![Build Status](https://travis.ibm.com/bdu/chell.svg?token=CCLjK5gsaLWyxhCwwcrs&branch=master)](https://travis.ibm.com/bdu/chell)

# Chell

Global course catalog service.

## Bootstrap

1.  Build image.

    ```sh
    docker-compose build
    ```

1.  Install npm packages locally for development.

    ```sh
    docker-compose run chell npm install; docker-compose down
    ```

You're ready to start developing!

## Cheatsheet

*   Development web server.

    ```sh
    docker-compose run --service-ports chell npm run dev; docker-compose down
    ```

*   Development console.

    ```sh
    docker-compose run --service-ports chell ash; docker-compose down
    ```

*   Precompile assets.

    ```sh
    docker-compose run --service-ports chell npm run assets; docker-compose down
    ```

*   Lint.

    ```sh
    docker-compose run chell npm run lint; docker-compose down
    ```

*   Run test suite.

    ```sh
    docker-compose run chell npm test; docker-compose down
    ```

## License

Please refer to [LICENSE](LICENSE).

## Authors

*   Partner Ecosystem Team, IBM Digital Business Group <mailto:imcloud@ca.ibm.com>
