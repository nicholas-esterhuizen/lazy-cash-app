# Product Requirements Document
## The Lazy Cash App — v1.0

---

**Problem**

Idle cash is a silent tax. Individuals holding meaningful liquidity — whether awaiting a capital call, a property settlement, or simply building a buffer — routinely leave that cash in bank accounts earning near-zero yield. The opportunity cost is real and quantifiable, yet no lightweight tool exists that translates a person's actual liquidity timeline into a specific, optimised allocation across yield-bearing instruments. The gap isn't knowledge; it's friction.

**Target User**

Financially literate individuals with $50,000–$500,000 in near-term deployable cash who have defined liquidity windows and want to earn yield without taking on meaningful duration or credit risk. They understand what an ETF is. They do not want to speak to an advisor.

**Inputs**

The user provides three things: total cash available and currency, and a breakdown across three liquidity tranches — funds needed within 30 days, within 90 days, and funds available for 180 days or longer. The three tranches must sum to total cash; the UI enforces this.

**Logic Engine**

The app maintains a curated static dataset of 15–20 real, publicly traded ETFs segmented into three duration buckets matching the liquidity tranches. Each ETF carries four scored attributes: yield (annualised), TER, credit quality (mapped to a numeric score from the fund's weighted average credit quality breakdown), and average daily volume as a liquidity proxy. For each tranche, the engine ranks eligible ETFs on a weighted composite score and recommends the top fund. Weighting defaults: yield 40%, TER 25%, credit quality 25%, liquidity 10%. In the 30-day bucket, credit quality weight increases and yield weight decreases — capital preservation takes priority at short duration.

**Outputs**

- Recommended ETF per tranche with ticker, fund name, yield, TER, AUM, and allocation amount
- Blended yield across the full tranched cash position (weighted average)
- Opportunity cost table: projected earnings tranched vs projected earnings in cash (using a configurable cash rate input, defaulting to a reasonable savings account rate)
- Maturity/action reminders: flagged dates at which longer-duration positions should be reviewed or rolled

**Constraints (v1)**

- Static dataset only — no live API. Data sourced manually at build time and clearly timestamped. A visible disclaimer notes that metrics reflect a point-in-time snapshot.
- USD-denominated ETFs only in v1, with currency input for display conversion.
- No user accounts, no data persistence. Session-only.
- No financial advice framing. Output is labelled as illustrative modelling, not a recommendation.

**Out of Scope (v1)**

Live data feeds, tax optimisation, broker integration, portfolio tracking, mobile app.

**Success Criteria**

A user with meaningful idle cash can open the app, enter their position and liquidity requirements, and within 60 seconds receive a coherent, defensible tranched allocation with projected yield — and leave with a clearer view of what their cash could be doing.