/* eslint-disable linebreak-style */
const { addNoteHandler } = require('./handler'); // Pastikan path ini benar
const { getAllNotesHandler, getNoteByIdHandler, editNoteByIdHandler, deleteNoteByIdHandler } = require('./handler'); // Pastikan path ini benar

const routes = [
  {
    method: 'POST',
    path: '/notes', // Path yang benar
    handler: addNoteHandler,
  },
  {
    method: 'GET',
    path: '/notes',
    handler: getAllNotesHandler,
  },
  {
    method: 'GET',
    path: '/notes/{id}', // Gunakan {id} untuk parameter
    handler: getNoteByIdHandler,
  },
  {
    method: 'PUT',
    path: '/notes/{id}', // Gunakan {id} untuk parameter
    handler: editNoteByIdHandler,
  },
  {
    method: 'DELETE',
    path: '/notes/{id}', // Gunakan {id} untuk parameter
    handler: deleteNoteByIdHandler,
  },
];

module.exports = routes;