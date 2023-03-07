import { expect, Page } from "@playwright/test";

const URL = 'https://www.techmagic.co/';

export class HomePage {
    readonly page: Page;
    
    constructor(page: Page) {
        this.page = page;
    }

    async goto() {
        await this.page.goto(URL);
    }

    async clickGetStarted() {
        await this.page.getByRole('link', { name: 'Get started' }).click();
    }

    async verifyTitle(text: string) {
        await expect(this.page).toHaveTitle(text);
    }

    async verifyUrl(text: string) {
        await expect(this.page).toHaveURL(text);
    }
    
}