import { faker } from '@faker-js/faker';

export class FormData {
    public email: string = faker.internet.email();
    public message: string = faker.lorem.paragraph();

    constructor() {
    }
}