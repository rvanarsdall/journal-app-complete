let express = require("express");
let router = express.Router();
const validateSession = require("../middleware/validate-session");
const Journal = require("../db").import("../models/journal");

router.post("/practice", validateSession, function (req, res) {
  console.log(router);
  res.send("Hey This is a practice route");
});

router.post("/create", validateSession, function (req, res) {
  const journalEntry = {
    title: req.body.journal.title,
    date: req.body.journal.date,
    entry: req.body.journal.entry,
    owner: req.user.id,
  };
  Journal.create(journalEntry)
    .then((journal) => res.status(200).json(journal))
    .catch((err) => res.status(500).json({ error: err }));
});

router.get("/", function (req, res) {
  Journal.findAll()
    .then((journals) => res.status(200).json(journals))
    .catch((err) => res.status(500).json({ error: err }));
});
router.get("/mine", validateSession, function (req, res) {
  const query = { where: { owner: req.user.id } };
  Journal.findAll(query)
    .then((journals) => res.status(200).json(journals))
    .catch((err) => res.status(500).json({ error: err }));
});
router.put("/update/:entryId", validateSession, function (req, res) {
  const updateJournalEntry = {
    title: req.body.journal.title,
    date: req.body.journal.date,
    entry: req.body.journal.entry,
  };

  const query = { where: { id: req.params.entryId, owner: req.user.id } };

  Journal.update(updateJournalEntry, query)
    .then((journals) => res.status(200).json(journals))
    .catch((err) => res.status(500).json({ error: err }));
});

router.delete("/delete/:id", validateSession, function (req, res) {
  const query = { where: { id: req.params.id, owner: req.user.id } };
  Journal.destroy(query)
    .then((journal) => {
      if (journal !== 0) {
        res.status(200).json({ message: "Journal Entry Removed" });
      } else {
        res.status(200).json({ message: "No Entry Found" });
      }
    })
    .catch((err) => res.status(500).json({ error: err }));
});

router.get("/:title", function (req, res) {
  let title = req.params.title;
  const query = { where: { title: title } };
  Journal.findAll(query)
    .then((journals) => res.status(200).json(journals))
    .catch((err) => res.status(500).json({ error: err }));
});
module.exports = router;
