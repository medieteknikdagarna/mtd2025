import PocketBase from 'pocketbase';

const url = 'https://mtd2024-databas.pockethost.io/'

export const pb = new PocketBase(url)



// const records = await client.collection('posts').getFullList({
//     sort: '-created',
// });