[![Build Status](https://travis.ibm.com/bdu/gamora.svg?token=sEYcW68KU3tGRyi3z1eH&branch=master)](https://travis.ibm.com/bdu/gamora)

# Gamora

Automated backups for MySQL, Mongo, and file paths using the Monsoon library.

## Development

1.  Build locally.

    ```sh
    bin/build
    ```

2.  Run locally.

    ```sh
    cp .env{.example,}
    nano .env
    docker-compose up
    ```

## Production

1.  Build and publish.

    ```sh
    git add ...
    git commit
    git tag -a 0.1.0 -m v0.1.1 # If you want to publish
    git push --tags
    ```

2.  Check [Travis](https://travis.ibm.com/bdu/gamora/builds).

## License

Please refer to [LICENSE](LICENSE).

## Authors

*   Partner Ecosystem Team, IBM Digital Business Group <mailto:imcloud@ca.ibm.com>
