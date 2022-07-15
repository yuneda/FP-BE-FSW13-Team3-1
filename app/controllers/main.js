module.exports = {
  index(req, res) {
    res.status(200).send({
      status: 'OK',
      message: 'Backend Second Hand is up and running!',
    });
  },

  onLost(req, res) {
    res.status(404).send('404');
  },

  onError(err, req, res) {
    res.status(500).json({
      message: err.message,
    });
  },
};
