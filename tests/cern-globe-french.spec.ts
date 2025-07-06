import { test, expect } from '@playwright/test';

test.describe('CERN Globe Page in French', () => {
  test('Navigate to Globe page and verify French content', async ({ page }) => {
    // Navigate to the French CERN visit site
    await page.goto('https://visit.cern/fr');
    
    // Verify we're on the French homepage
    await expect(page).toHaveTitle(/Accueil \| visit\.cern/);
    
    // Open the navigation menu
    await page.getByRole('button', { name: 'Toggle navigation' }).click();
    
    // Click on the Globe link in the "À propos de nous" section
    await page.getByRole('link', { name: 'j Le Globe de la science et' }).click();
    
    // Verify we've navigated to the Globe page
    await expect(page).toHaveURL('https://visit.cern/fr/globe');
    
    // Verify the page title is in French
    await expect(page).toHaveTitle('Le Globe de la science et de l\'innovation | visit.cern');
    
    // Verify the main heading is in French
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Le Globe de la science et de l\'innovation');
    
    // Verify French content is present
    await expect(page.getByText(/Le Globe de la science et de l'innovation, avec sa silhouette bien connue/)).toBeVisible();
    await expect(page.getByText(/est l'œuvre des architectes genevois Hervé Dessimoz et Thomas Büchi/)).toBeVisible();
    await expect(page.getByText(/La Confédération suisse a fait don de ce bâtiment au CERN/)).toBeVisible();
    
    // Verify the image of the Globe is present
    await expect(page.getByRole('img', { name: 'Globe de la science et de l\'innovation' })).toBeVisible();
    
    // Verify there's a link to event rental in French
    await expect(page.getByRole('link', { name: 'peut être loué pour des événements privés' })).toBeVisible();
  });

  test('Verify Globe page language and navigation elements', async ({ page }) => {
    // Navigate directly to the Globe page in French
    await page.goto('https://visit.cern/fr/globe');
    
    // Verify the page loaded correctly
    await expect(page).toHaveURL('https://visit.cern/fr/globe');
    
    // Verify CERN toolbar is present with French elements
    await expect(page.getByRole('link', { name: 'Répertoire' })).toBeVisible();
    
    // Verify the footer contains French navigation
    await expect(page.getByRole('heading', { name: 'Nous contacter' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Le CERN & vous' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Votre événement' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Vos données' })).toBeVisible();
    
    // Verify footer links are in French
    await expect(page.getByRole('link', { name: 'j Bureau de presse' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'j Autres demandes' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'j Le CERN et ses voisins' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'j Éducation' })).toBeVisible();
    
    // Verify the Globe page content structure
    const globeDescription = page.getByText(/Le Globe de la science et de l'innovation, avec sa silhouette bien connue/);
    await expect(globeDescription).toBeVisible();
    
    const swissGift = page.getByText(/La Confédération suisse a fait don de ce bâtiment au CERN/);
    await expect(swissGift).toBeVisible();
    
    const eventInfo = page.getByText(/Le Globe de la science et de l'innovation accueille différentes manifestations/);
    await expect(eventInfo).toBeVisible();
  });

  test('Verify Globe page accessibility and content quality', async ({ page }) => {
    // Navigate to the Globe page
    await page.goto('https://visit.cern/fr/globe');
    
    // Verify essential accessibility elements
    await expect(page.getByRole('link', { name: 'Aller au contenu principal' })).toBeVisible();
    await expect(page.getByRole('banner')).toBeVisible();
    await expect(page.getByRole('main')).toBeVisible();
    await expect(page.getByRole('contentinfo')).toBeVisible();
    
    // Verify the main content area has proper heading structure
    const mainHeading = page.getByRole('heading', { level: 1, name: 'Le Globe de la science et de l\'innovation' });
    await expect(mainHeading).toBeVisible();
    
    // Verify the image has proper alt text
    const globeImage = page.getByRole('img', { name: 'Globe de la science et de l\'innovation' });
    await expect(globeImage).toBeVisible();
    
    // Verify key information is present and accessible
    await expect(page.getByText(/Expo '02/)).toBeVisible();
    await expect(page.getByText(/puits de carbone naturel/)).toBeVisible();
    await expect(page.getByText(/50e anniversaire de l'Organisation, en 2004/)).toBeVisible();
    
    // Verify social media links are accessible
    await expect(page.getByRole('link', { name: 'v' })).toHaveAttribute('href', 'https://www.facebook.com/cern/');
    await expect(page.getByRole('link', { name: 'J' })).toHaveAttribute('href', 'https://www.instagram.com/cern/');
    await expect(page.getByRole('link', { name: 'W' })).toHaveAttribute('href', 'https://twitter.com/cern');
    await expect(page.getByRole('link', { name: 'M' })).toHaveAttribute('href', 'https://www.linkedin.com/company/cern/');
    await expect(page.getByRole('link', { name: '1' })).toHaveAttribute('href', 'https://www.youtube.com/user/CERNTV');
  });
});
