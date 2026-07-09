import fetch from 'node-fetch';

async function testSearch() {
  console.log('🔍 Testing Search API...\n');

  const searchTerms = ['visa', 'business', 'LLC', 'passport', 'tax'];

  for (const term of searchTerms) {
    try {
      console.log(`Searching for: "${term}"`);
      
      const response = await fetch(
        `http://localhost:3001/api/search?q=${encodeURIComponent(term)}`
      );
      const data = await response.json() as any;

      if (data.results && Array.isArray(data.results)) {
        console.log(`   ✅ Found ${data.results.length} results`);
        data.results.slice(0, 2).forEach((result: any, idx: number) => {
          console.log(`      ${idx + 1}. ${result.title || result.name}`);
        });
      } else {
        console.log(`   ⚠️  No results found`);
      }
    } catch (error) {
      console.log(`   ❌ Error: ${(error as Error).message}`);
    }
    console.log();
  }
}

testSearch();
