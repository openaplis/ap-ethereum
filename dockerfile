FROM ethereum/client-go:latest
RUN mkdir -p /usr/ethereum
ENTRYPOINT ["geth", "--datadir", "/usr/ethereum"]
