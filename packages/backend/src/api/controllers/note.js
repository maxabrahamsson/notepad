// @flow
import { dbConnection } from '../../index';
import { Data } from '../../data';

export async function getNotes(req: any, res: any) {
  const { userId } = req.swagger.params;
  dbConnection.find({ uid: userId }, (err, data) => {
    if (err) return res.json({ success: false, error: err });
    return res.json(data);
  });
}

export async function updateNote(req: any, res: any) {
  const { id, update } = req.body;
  const { userId } = req.swagger.params;
  dbConnection.findOneAndUpdate({ _id: id, uid: userId }, update, (err) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
}
export async function deleteNote(req: any, res: any) {
  const { id } = req.body;
  const { userId } = req.swagger.params;
  dbConnection.findOneAndDelete({ _id: id, uid: userId }, (err) => {
    if (err) return res.send(err);
    return res.json({ success: true });
  });
}
export async function addNote(req: any, res: any) {
  const data = new Data();
  const { message } = req.body;
  const { userId } = req.swagger.params;

  if (!message) {
    return res.json({
      success: false,
      error: 'INVALID INPUTS',
    });
  }
  data.message = message;
  data.uid = userId;
  data.save((err) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
}
