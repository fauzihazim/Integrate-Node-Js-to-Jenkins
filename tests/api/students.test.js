import request from 'supertest';
import app from '../../index.js';

const baseUrl = 'http://localhost:3000/';

describe('Student API', () => {
  // Jest's test() + Supertest's request()
  // it('should return correct student data', async () => {
  //   const res = await request(baseUrl).get('/getStudents');
    
  //   expect(res.body).toMatchObject({
  //     status: 'success',
  //     data: expect.arrayContaining([
  //       expect.objectContaining({
  //         name: 'Ali',
  //         grade: 85
  //       })
  //     ])
  //   });
  // });

  it('should return a list of students with status success', async () => {
    const res = await request(baseUrl).get('getStudents');
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('success');
    expect(Array.isArray(res.body.data)).toBe(true);
    expect(res.body.data).toEqual(
        expect.arrayContaining([
            expect.objectContaining({
                id: expect.any(Number),
                name: expect.any(String),
                subject: expect.any(String),
                grade: expect.any(Number)
            })
        ])
    );
    expect(res.body).toMatchObject({
      status: 'success',
      data: expect.arrayContaining([
        expect.objectContaining({
          "id": 1,
          "name": "Ali",
          "subject": "Math",
          "grade": 85
        })
      ])
    });
  });


  // test('GET /getStudents returns students', async () => {
  //   const res = await request(baseUrl)
  //     .get('/getStudents')
  //     .expect(200);

  //   // Jest assertions
  //   expect(res.body).toEqual({
  //     status: 'success',
  //     students: [
  //       { name: 'student 1', grade: 70 }
  //     ]
  //   });
  // });

  // test('POST /students creates new student', async () => {
  //   await request(baseUrl)
  //     .post('/students')
  //     .send({ name: 'student 2', grade: 85 })
  //     .expect(201);
  // });
});