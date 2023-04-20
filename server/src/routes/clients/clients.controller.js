const db = require('../../../database/db');

const { getAllClients, getClientById } = require('../../models/clients.model');

function httpGetAllClients(req, res) {
  return res.status(200).json(getAllClients());
}

// CREATE NEW CLIENT
function httpPostNewClient(req, res) {
  const { company_name, contact_person, contact_number, address } = req.body;

  if (!company_name || !contact_person || !contact_number || !address) {
    return res.status(400).json({ error: 'Invalid input' });
  }

  const promise = new Promise((resolve, reject) => {
    const sql = `INSERT INTO clients (company_name, contact_person, contact_number, address) VALUES (?, ?, ?, ?)`;
    db.run(
      sql,
      [company_name, contact_person, contact_number, address],
      (err) => {
        if (err) {
          reject(err);
        } else {
          const sql = `SELECT * FROM clients ORDER BY id DESC LIMIT 1`;
          db.all(sql, [], (err, rows) => {
            if (err) {
              reject(err);
            } else {
              resolve(rows[0]);
            }
          });
        }
      }
    );
  });

  promise
    .then((newClient) => {
      res.status(201).json(newClient);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
}

function httpEditEmployee(req, res) {
  const { id, company_name, contact_person, contact_number, address } =
    req.body;

  const updatedClient = getClientById(id);

  updatedClient.company_name = company_name;
  updatedClient.contact_person = contact_person;
  updatedClient.contact_number = contact_number;
  updatedClient.address = address;

  const sql = `UPDATE clients SET company_name=?, contact_person=?, contact_number=?, address=? WHERE clients.id=?`;

  db.run(
    sql,
    [company_name, contact_person, contact_number, address, id],
    (err) => {
      if (err) {
        return res.status(500).json({ error: err });
      }
    }
  );

  return res.status(200).json(updatedClient);
}

module.exports = {
  httpGetAllClients,
  httpPostNewClient,
  httpEditEmployee
};
