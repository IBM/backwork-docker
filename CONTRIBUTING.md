# Contributing

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

## Publishing

1.  Build and publish.

    ```sh
    git add ...
    git commit
    git tag -a 0.1.0 -m v0.1.1 # If you want to publish
    git push --tags
    ```

2.  Check dockerhub

## License

Please refer to [LICENSE](LICENSE).

## Authors

*   IBM Developer Skills Network
