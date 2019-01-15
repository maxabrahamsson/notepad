// @flow
import { dbConnection } from '../../index';
import { Data } from '../../data';

export async function getNotes(req: any, res: any) {
  const { userId } = req.swagger.params;
  dbConnection.find({ uid: userId }, (err, data) => {
    if (err) return res.json({ result: false, error: err });
    return res.json(data);
  });
}

export async function updateNote(req: any, res: any) {
  const { id, message } = req.body;
  const { userId } = req.swagger.params;
  console.log(id);
  console.log(message);
  console.log(userId);
  dbConnection.findOneAndUpdate({ _id: id, uid: userId }, { message }, (err) => {
    if (err) return res.json({ result: false, error: err });
    return res.json({ result: true });
  });
}
export async function deleteNote(req: any, res: any) {
  const noteId = req.swagger.params.noteId.value;
  const { userId } = req.swagger.params;
  dbConnection.findOneAndDelete({ _id: noteId, uid: userId }, (err) => {
    if (err) return res.send(err);
    return res.json({ result: true });
  });
}
export async function addNote(req: any, res: any) {
  const data = new Data();
  const { message } = req.body;
  const { userId } = req.swagger.params;

  if (!message) {
    return res.json({
      result: false,
      error: 'INVALID INPUTS',
    });
  }
  data.message = message;
  data.uid = userId;
  data.save((err) => {
    if (err) return res.json({ result: false, error: err });
    return res.json({ result: true });
  });
}
