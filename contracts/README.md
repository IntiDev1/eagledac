## Foundry

**Foundry is a blazing fast, portable and modular toolkit for Ethereum application development written in Rust.**

Foundry consists of:

- **Forge**: Ethereum testing framework (like Truffle, Hardhat and DappTools).
- **Cast**: Swiss army knife for interacting with EVM smart contracts, sending transactions and getting chain data.
- **Anvil**: Local Ethereum node, akin to Ganache, Hardhat Network.
- **Chisel**: Fast, utilitarian, and verbose solidity REPL.

## Documentation

https://book.getfoundry.sh/

## Usage

### Build

```shell
$ forge build
```

### Test

```shell
$ forge test
```

### Format

```shell
$ forge fmt
```

### Gas Snapshots

```shell
$ forge snapshot
```

### Anvil

```shell
$ anvil
```

### Deploy

```shell
$ forge script script/Counter.s.sol:CounterScript --rpc-url <your_rpc_url> --private-key <your_private_key>
```

### Cast

```shell
$ cast <subcommand>
```

### Help

```shell
$ forge --help
$ anvil --help
$ cast --help
```

# Desplegar contrato

forge create --rpc-url metis --private-key $PK src/DACFactory.sol:DACFactory

# Verificar contrato

forge verify-contract --chain-id 1088 <DIRECCION_CONTRATO> src/DACFactory.sol:DACFactory

# Configuracion de mentis

curl https://hype-faucet.metis.io/request -X POST -d '{"address": "TU_DIRECCION"}'

# prueba de frontend

npm run dev

# prueba de backend

python -m uvicorn contract_generator:app --port 5000

# prueba de contratos

forge test --fork-url https://andromeda.metis.io/?owner=1088
