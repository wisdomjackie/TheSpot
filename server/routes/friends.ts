import { request } from "http";

const express = require('express');
const friendRouter = express.Router();
const { Friendships, Reels, Users, Events } = require('../db/index');


// create get request for all friendships
friendRouter.get('/', (req: any, res: any) => {
  Friendships.findAll()
    .then((data: any) => {
      console.log('friendRouter GET data', data);
      res.status(200).send(data);
    })
    .catch((err: any) => {
      console.error('friendRouter GET from database Error', err);
      res.sendStatus(500);
    });
});

// create post request for friendship with 'pending' status
friendRouter.post('/', (req: any, res: any) => {
  const { id } = req.user;
  const { accepter_id } = req.body;
  Friendships.bulkCreate([
    { status: 'pending', requester_id: id, accepter_id },
    { status: 'pending', requester_id: accepter_id, accepter_id: id },
  ])
    .then((data: any) => {
      console.log('friendRoute POST friend data', data);
      res.sendStatus(201);
    })
    .catch((err: any) => {
      console.error('friendRouter POST to database Error:', err);
    });
});

// update put request for friendship with 'approved' status
friendRouter.put('/', (req: any, res: any) => {
  const { id } = req.user;
  const { requester_id } = req.body;
  Friendships.update(
    { status: 'approved' },
    {
      where: {
          accepter_id: [id, requester_id],
          status: 'pending',
        },
    })
    .then((data: any) => {
      console.log('friendRoute UPDATE friend approved status', data);
      res.sendStatus(200);
    })
    .catch((err: any) => {
      console.error('friendRouter UPDATE to database Error:', err);
    });
})

// create get request for based on requestId

export default friendRouter;

// // update put request for friendship with 'approved' status
// friendRouter.put('/', (req: any, res: any) => {
//   // const { id } = req.user;
//   const { requester_id, accepter_id } = req.body;
//   Friendships.update(
//     { status: 'approved' },
//     {
//       where: {
//         accepter_id: [6, 2],
//         status: 'pending',
//       },
//     }
//   )
//     .then((data: any) => {
//       console.log('friendRoute UPDATE friend data', data);
//       res.sendStatus(200);
//     })
//     .catch((err: any) => {
//       console.error('friendRouter UPDATE to database Error:', err);
//     });
// });
