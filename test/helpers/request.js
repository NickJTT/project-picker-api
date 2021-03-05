import supertest from 'supertest';

const URL = 'http://127.0.0.1:5000/';

const request = supertest(URL);
export default request;
