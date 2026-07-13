# Security Policy

## Supported versions

This project is in **alpha (0.x)**. Only the latest `0.x` release receives fixes.

| Version      | Supported |
| ------------ | --------- |
| latest `0.x` | ✅        |
| older        | ❌        |

## Reporting a vulnerability

Please **do not** open a public issue for security problems. Instead, report privately via
[GitHub Security Advisories](https://github.com/Lee-Dongwook/E2E-Self-Heal/security/advisories/new)
or email the maintainer at `dlehddnr0713@gmail.com`. We aim to acknowledge within a few days.

## Scope guardrail

By design the engine only edits **failing selectors and wait conditions** — never assertions
or test logic — and every patch is human-reviewable before it lands.
