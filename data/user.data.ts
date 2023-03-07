import { faker } from '@faker-js/faker';

export class User {
    public name = faker.name.firstName();
    public email = faker.internet.email();
    public gender = 'female';
    public status: string = 'inactive';
    constructor() {
    }

}
