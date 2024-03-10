const puppeteer = require('puppeteer');

async function crawlNaverMap(query) {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();

  try {
    // 네이버 지도 페이지 열기
    await page.goto(`https://map.naver.com/p/search/${encodeURIComponent(query)}`, { waitUntil: 'domcontentloaded' });

    // 검색 결과 기다리기 (페이지가 로딩되면서 Ajax로 데이터를 받아오는 경우 대비)
    await page.waitForSelector('.panel_content');

    // 결과 수집
    const results = await page.evaluate(() => {
      const items = Array.from(document.querySelectorAll('.VLTHu.OW9LQ')); // 검색 결과 아이템 선택자

      return items.map(item => {
        const title = item.querySelector('.YwYLL').textContent.trim();
        const address = item.querySelector('.zZfO1:first-child').textContent.trim();
        const category = item.querySelector('.YzBgS').textContent.trim();

        return { title, address, category };
      });
    });

    return results;
  } finally {
    // 브라우저 닫기
    await browser.close();
  }
}

// "지명 + 공원"으로 검색 예제
const query = '부천시 공원';
crawlNaverMap(query)
  .then(results => {
    console.log(`검색 결과 (${query}):`);
    console.log(results);
  })
  .catch(error => {
    console.error('크롤링 중 오류가 발생했습니다.', error);
  });
