require('dotenv').config()
import {expect, test} from '@playwright/test';
import {User} from "../data/user.data";

const API_URL = 'https://gorest.co.in/public/v2';
const API_TOKEN = process.env.API_TOKEN;

const headers = {
    authorization: `Bearer ${API_TOKEN}`,
};

test.describe('API User Testing', () => {
    let userId: number;

    test('list 200', async ({request}) => {
        const response = await request.get(`${API_URL}/users`);

        expect(response).toBeOK();
        expect(response.status()).toEqual(200);
        expect(response.headers()['content-type']).toEqual('application/json; charset=utf-8');

        // save the first user id for the next test
        userId = (await response.json())[0].id;
    });

    test('one 200', async ({request}) => {
        const response = await request.get(`${API_URL}/users/${userId}`);

        expect(response).toBeOK();
        expect(response.status()).toEqual(200);
        const json = await response.json();
        expect(json).toHaveProperty('id');
        expect(json).toHaveProperty('name');
        expect(json).toHaveProperty('email');
        expect(json).toHaveProperty('gender');
        expect(json).toHaveProperty('status');
        expect(json.id).toEqual(userId);
    });

    test('one 404', async ({request}) => {
        const response = await request.get(`${API_URL}/users/123`);
        expect(response).not.toBeOK();
        expect(response.status()).toEqual(404);
        const json = await response.json();
        expect(json).toEqual({message: 'Resource not found'});
    });

    test('create 201', async ({request}) => {
        const testUser = new User();

        const response = await request.post(`${API_URL}/users`, {
            data: testUser,
            headers: headers
        });

        expect(response).toBeOK();
        expect(response.status()).toEqual(201);

        //verify the response has the correct properties
        const json = await response.json();
        expect(json).toHaveProperty('id');
        expect(json).toHaveProperty('name');
        expect(json).toHaveProperty('email');
        expect(json).toHaveProperty('gender');
        expect(json).toHaveProperty('status');

        //verify the user data is correct in the response
        expect(json.email).toEqual(testUser.email);

        // save the user id for the next test
        userId = json.id;
    });

    test('update 200', async ({request}) => {
        const response = await request.patch(`${API_URL}/users/${userId}`, {
            data: {
                status: 'active',
            },
            headers: headers
        });

        expect(response).toBeOK();
        expect(response.status()).toEqual(200);
        const json = await response.json();
        expect(json).toHaveProperty('status');
        expect(json.status).toEqual('active');
    });

    test('delete 204', async ({request}) => {
        const response = await request.delete(`${API_URL}/users/${userId}`, {
            headers: headers
        });

        expect(response).toBeOK();
        expect(response.status()).toEqual(204);

        expect(String(await response.body())).toEqual('');
    });

    test.afterAll(async ({request}) => {
        userId = 0;
    });
});
