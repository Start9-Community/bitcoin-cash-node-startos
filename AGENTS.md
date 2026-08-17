# AGENTS.md

This is a StartOS service-package repository — it builds a `.s9pk` for StartOS.

Develop it inside a StartOS packaging workspace created by `start-cli s9pk init-workspace`,
which provides the packaging guide and agent context one level up. If you're reading this in a
bare clone with no workspace, the full guide is at <https://docs.start9.com/packaging>.

Work this package's `TODO.md` from top to bottom. Keep `README.md` (technical reference for an AI support or administering agent) and `instructions.md` (end-user docs) in sync with your changes.

## This repo

- **The package id is `bitcoincashd`, not `bchn` or `bitcoin-cash-node`.** Dependent packages (Fulcrum BCH, BCH Explorer, the mining pools) reference it by that id, and the interface id constants they import live in `startos/utils.ts`.
- **testnet4's ports are remapped to 28342/28343 on purpose.** BCHN's defaults for it are 28332/28333, which are this package's ZMQ block and transaction ports. Don't "restore" the upstream defaults.
- **`-listenonion=0` is forced.** BCHN would otherwise try a Tor control port on `127.0.0.1:9051`, which `tor-startos` does not offer — its control interface is a Unix socket. Inbound onion comes from attaching the Tor service's URL plugin to the Peer interface.
- **Tor's SOCKS proxy is reached over the service bridge with a `9050` fallback.** The fallback holds the address constant while Tor is absent, so the `.const()` doesn't restart the node on Tor install/uninstall, and a dead address is just connection-refused — which is why `-onion` is safe to pass unconditionally.
- **Onion-only mode adds `-proxy`, `-dnsseed=0` and `-dns=0`, and all three belong together.** Without them a clearnet DNS-seed or addrman fallback leaks the node's address while the user believes they are Tor-only.
