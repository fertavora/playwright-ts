import { test, expect } from '@playwright/test';

function normalizeWhitespace(text: string): string {
  return text.replace(/\s+/g, ' ').trim();
}

function formatSpanishDate(dateStr: string): string {
  const monthMap: Record<string, string> = {
    'ENE': '01', 'FEB': '02', 'MAR': '03', 'ABR': '04',
    'MAY': '05', 'JUN': '06', 'JUL': '07', 'AGO': '08',
    'SEP': '09', 'OCT': '10', 'NOV': '11', 'DIC': '12'
  };

  const match = dateStr.match(/(\d{2})\s+(\w{3})\s+(\d{4})\.\s*(\d{2}:\d{2})/);
  if (!match) return dateStr;

  const [, day, month, year, time] = match;
  const monthNum = monthMap[month.toUpperCase()] || '01';

  return `${year}-${monthNum}-${day} ${time}`;
}

test.describe('BeSoccer Home Page', () => {
  const hrefs:string[] = [];
  test('Get matches links', async ({ page }) => {
    await page.goto('https://es.besoccer.com/equipo/partidos/independiente');
    const cookies = page.getByRole('button', { name: 'ACEPTO', exact: true });
    if(await cookies.isVisible()) {
      await cookies.click();
    }

    await page.locator('#season').selectOption({ label: '2016-17' });
    await page.locator('#panels .panel-title', { hasText: '- 2016' }).first().waitFor();

    const matchLinks = await page.locator('.content .match-link').all();
    
    for (const link of matchLinks) {
      const href = await link.getAttribute('href');
      if (href) {
        hrefs.push(href);
      }
    }
    // console.log('Match Links:', hrefs);
    expect(hrefs.length).toBeGreaterThan(0);
  });
  
  test('Independiente', async ({ page }) => {
    for (const href of hrefs) {
      await page.goto(href);
      const cookies = page.getByRole('button', { name: 'ACEPTO', exact: true });
      if(await cookies.isVisible()) {
        await cookies.click();
      }


      const resultado = await page.locator('.match-header .marker').textContent();
      const date = await page.locator('.date.header-match-date').textContent();
      const teamLeft = await page.locator('.team.match-team.left .name-box .name').textContent();
      const teamRight = await page.locator('.team.match-team.right .name-box .name').textContent();
      const competition = await page.locator('.competition a').textContent();
      console.log('Match Date:', formatSpanishDate(date?.trim() || ''));
      console.log('Competition:', normalizeWhitespace(competition || ''));
      console.log(`Match Result: ${teamLeft?.trim()} ${resultado?.trim()} ${teamRight?.trim()}`);
      expect(true).toBeTruthy();
    }
  });
});
