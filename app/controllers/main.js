module.exports = {
  index(req, res) {
    res.status(200).send({
      status: 'OK',
      message: 'Backend Second Hand is up and running!',
    });
  },

  onLost(req, res) {
    res.status(404).render("404", {
      url: req.url,
    });
  },

  onError(err, req, res, next) {
    res.status(500).render("500", {
      name: err.name,
      message: err.message,
    });
  },
};
