const Bull = require('bull');
const pool = require('../config/database');
const WalmartScraper = require('./walmart-scraper');
const LowesScraper = require('./lowes-scraper');
const HomeDepotScraper = require('./home-depot-scraper');

const dealQueue = new Bull('deal-scraping', {
  redis: {
    host: process.env.REDIS_HOST || 'localhost',
    port: process.env.REDIS_PORT || 6379
  }
});

const walmartScraper = new WalmartScraper();
const lowesScraper = new LowesScraper();
const homeDepotScraper = new HomeDepotScraper();

// Process deals
dealQueue.process(async (job) => {
  console.log('Processing deal scraping job...');
  
  try {
    const [walmartDeals, lowesDeals, homedepotDeals] = await Promise.all([
      walmartScraper.searchDeals(),
      lowesScraper.searchDeals(),
      homeDepotScraper.searchDeals()
    ]);

    const allDeals = [
      ...walmartDeals,
      ...lowesDeals,
      ...homedepotDeals
    ];

    // Save to database
    for (const deal of allDeals) {
      await pool.query(
        `INSERT INTO products (sku, name, description, category, store, original_price, current_price, discount_percentage, active, created_at, last_scanned)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, true, NOW(), NOW())
         ON CONFLICT (sku) DO UPDATE SET current_price = $7, last_scanned = NOW()`,
        [deal.sku, deal.name, deal.description, deal.category, deal.store, deal.originalPrice, deal.currentPrice, deal.discount]
      );
    }

    return { success: true, dealsProcessed: allDeals.length };
  } catch (err) {
    console.error('Deal processing error:', err);
    throw err;
  }
});

// Schedule every hour
setInterval(async () => {
  await dealQueue.add({}, { repeat: { cron: '0 * * * *' } });
}, 3600000);

module.exports = dealQueue;
