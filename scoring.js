const WEIGHTS = {
    30:  { yield: 0.30, ter: 0.25, credit: 0.35, liquidity: 0.10 },
    90:  { yield: 0.40, ter: 0.25, credit: 0.25, liquidity: 0.10 },
    180: { yield: 0.45, ter: 0.25, credit: 0.20, liquidity: 0.10 }
  };
  
  function normalise(value, min, max) {
    if (max === min) return 1;
    return (value - min) / (max - min);
  }
  
  function scoreETFs(bucket) {
    const funds = ETF_DATA.filter(etf => etf.bucket === bucket);
    const weights = WEIGHTS[bucket];
  
    const yields    = funds.map(f => f.yield);
    const ters      = funds.map(f => f.ter);
    const credits   = funds.map(f => f.creditScore);
    const liquidity = funds.map(f => f.adv);
  
    const minYield = Math.min(...yields);   const maxYield = Math.max(...yields);
    const minTer   = Math.min(...ters);     const maxTer   = Math.max(...ters);
    const minCredit= Math.min(...credits);  const maxCredit= Math.max(...credits);
    const minAdv   = Math.min(...liquidity);const maxAdv   = Math.max(...liquidity);
  
    return funds.map(fund => {
      const yieldScore    = normalise(fund.yield, minYield, maxYield);
      const terScore      = normalise(maxTer - fund.ter + minTer, minTer, maxTer);
      const creditScore   = normalise(fund.creditScore, minCredit, maxCredit);
      const liquidityScore= normalise(fund.adv, minAdv, maxAdv);
  
      const composite =
        yieldScore     * weights.yield    +
        terScore       * weights.ter      +
        creditScore    * weights.credit   +
        liquidityScore * weights.liquidity;
  
      return { ...fund, composite: parseFloat(composite.toFixed(4)) };
    }).sort((a, b) => b.composite - a.composite);
  }
  
  function getRecommendations(tranches) {
    const results = {};
  
    for (const bucket of [30, 90, 180]) {
      const allocation = tranches[bucket];
      if (!allocation || allocation <= 0) continue;
  
      const ranked = scoreETFs(bucket);
      const top = ranked[0];
  
      const annualYield = top.yield / 100;
      const daysInBucket = bucket;
      const projectedEarnings = allocation * annualYield * (daysInBucket / 365);
  
      results[bucket] = {
        etf: top,
        allocation,
        projectedEarnings: parseFloat(projectedEarnings.toFixed(2)),
        allRanked: ranked
      };
    }
  
    return results;
  }
  
  function getBlendedYield(recommendations, totalCash) {
    let weightedSum = 0;
    for (const bucket of [30, 90, 180]) {
      if (!recommendations[bucket]) continue;
      const { etf, allocation } = recommendations[bucket];
      weightedSum += (allocation / totalCash) * etf.yield;
    }
    return parseFloat(weightedSum.toFixed(2));
  }
  
  function getOpportunityCost(recommendations, totalCash, cashRate) {
    const laddered = Object.values(recommendations).reduce(
      (sum, r) => sum + r.projectedEarnings, 0
    );
  
    const cashEarnings = Object.entries(recommendations).reduce(
      (sum, [bucket, r]) => sum + r.allocation * (cashRate / 100) * (parseInt(bucket) / 365), 0
    );
  
    return {
      ladderedEarnings: parseFloat(laddered.toFixed(2)),
      cashEarnings: parseFloat(cashEarnings.toFixed(2)),
      opportunityCost: parseFloat((laddered - cashEarnings).toFixed(2))
    };
  }