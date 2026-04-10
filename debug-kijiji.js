async function debugKijiji() {
  const url = 'https://www.kijiji.ca/b-guitars/canada/squier-guitar/k0c613l0';
  const response = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    },
  });

  const html = await response.text();
  console.log('Status:', response.status);
  
  if (html.includes('__NEXT_DATA__')) {
    const marker = 'id="__NEXT_DATA__" type="application/json">';
    const start = html.indexOf(marker) + marker.length;
    const end = html.indexOf('</script>', start);
    const jsonStr = html.substring(start, end);
    const data = JSON.parse(jsonStr);
    
    // Check possible locations for listings
    const pageProps = data.props?.pageProps;
    console.log('Keys in pageProps:', Object.keys(pageProps || {}));

    // Common Next.js patterns for Kijiji
    const results = pageProps?.initialInternalData?.ads || 
                    pageProps?.initialData?.ads || 
                    pageProps?.results ||
                    pageProps?.ads;
    
    if (results) {
      console.log('Found results! Count:', results.length);
      if (results.length > 0) {
        console.log('Sample Listing:', JSON.stringify(results[0], null, 2).substring(0, 500));
      }
    } else {
      console.log('Could not find results in common paths.');
    }
  }
}

debugKijiji();
