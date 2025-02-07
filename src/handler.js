/* eslint-disable linebreak-style */
const { nanoid } = require('nanoid');
const notes = require('./notes'); // Pastikan path ini benar

const addNoteHandler = (request, h) => {
  const { titles, tags, body } = request.payload;

  const id = nanoid(16);
  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;

  const newNote = {
    titles, tags, body, id, createdAt, updatedAt,
  };

  notes.push(newNote);

  const isSuccess = notes.some((note) => note.id === id); // Gunakan some()

  if (isSuccess) {
    const response = h.response({
      status: 'success', // Konsisten: success bukan succes
      message: 'Catatan berhasil ditambahkan',
      data: {
        noteId: id,
      },
    });
    response.code(201);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Catatan gagal ditambahkan',
  });
  response.code(500); // Lebih baik gunakan 500 untuk kesalahan server
  return response;
};

const getAllNotesHandler = () => ({
  status: 'success', // Konsisten
  data: {
    notes,
  },
});

const getNoteByIdHandler = (request, h) => {
  const { id } = request.params;

  const note = notes.find((n) => n.id === id); // Gunakan find()

  if (note) { // Cek langsung note (tidak perlu undefined)
    return {
      status: 'success', // Konsisten
      data: {
        note,
      },
    };
  }

  const response = h.response({
    status: 'fail',
    message: 'Catatan tidak ditemukan',
  });
  response.code(404); // Kode 404 untuk not found
  return response;
};

const editNoteByIdHandler = (request, h) => {
  const { id } = request.params;
  const { titles, tags, body } = request.payload;
  const updatedAt = new Date().toISOString();

  const index = notes.findIndex((note) => note.id === id);

  if (index !== -1) {
    notes[index] = {
      ...notes[index],
      titles,
      tags,
      body,
      updatedAt,
    };

    const response = h.response({
      status: 'success', // Konsisten
      message: 'Catatan berhasil diperbarui',
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Gagal memperbarui catatan. Id tidak ditemukan', // Perbaikan pesan
  });
  response.code(404);
  return response;
};

const deleteNoteByIdHandler = (request, h) => {
  const { id } = request.params;
  const index = notes.findIndex((note) => note.id === id);

  if (index !== -1) {
    notes.splice(index, 1);
    const response = h.response({
      status: 'success', // Konsisten
      message: 'Catatan berhasil dihapus',
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Catatan gagal dihapus. Id tidak ditemukan', // Perbaikan pesan
  });
  response.code(404); // 404 lebih tepat dari 400 di sini
  return response;
};

module.exports = {
  addNoteHandler,
  getAllNotesHandler,
  getNoteByIdHandler,
  editNoteByIdHandler,
  deleteNoteByIdHandler,
};