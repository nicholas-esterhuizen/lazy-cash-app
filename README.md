# The Lazy Cash App

A cash optimisation tool that tranches idle capital across low-cost, yield-bearing ETFs 
based on your liquidity requirements.

**Live demo:** [Launch App](https://nicholas-esterhuizen.github.io/lazy-cash-app)

---

## The Problem

Idle cash is a silent tax. If you have $100,000 sitting in a bank account earmarked for 
a capital call, a property settlement, or a near-term expense, you are losing yield every 
day that money sits uninvested. The gap isn't knowledge — it's friction.

## What It Does

Enter your available cash and liquidity timeline. The app recommends a specific ETF 
allocation across three tranches:

- **30 days** — capital preservation, ultra-short T-bills and money market ETFs
- **90 days** — balanced yield and safety, short-duration Treasury and investment-grade ETFs
- **180 days+** — yield optimisation, short-to-medium duration bond ETFs

For each tranche it recommends a specific ETF, shows projected yield, and calculates the 
opportunity cost of doing nothing.

## How To Use It

Open `index.html` in your browser — or use the live demo link above. No installation, 
no account, no backend. Enter your cash position and liquidity requirements and the app 
does the rest.

## Tech Stack

Single HTML file. Vanilla JavaScript. No frameworks, no dependencies, no build step.

## Data

ETF metrics are sourced manually from fund factsheets and reflect a point-in-time snapshot 
(May 2025). This is v1 — static data only.

## Roadmap

- **v1.1** — Yield curve logic check: flag where a longer-duration tranche yields less 
than a shorter one and suggest consolidation
- **v2.0** — Replace static dataset with live data feed via Morningstar or similar API

## Disclaimer

Illustrative modelling only. Not financial advice. Always verify fund data directly with 
the issuer before making investment decisions.