module.exports = {
  index(req, res) {
    res.status(200).send({
      status: 'OK',
      message: 'Backend Second Hand is up and running!',
    });
  },

  onLost(req, res) {
    res.status(404).send("404");
  },

  onError(err, req, res, next) {
    res.status(500).send("500");
  },
};
