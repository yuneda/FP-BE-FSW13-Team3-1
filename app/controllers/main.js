module.exports = {
  index(req, res) {
    res.status(200).send("index");
  },

  onLost(req, res) {
    // res.status(404).render("404", {
    //   url: req.url,
    // });
    res.send("onLost");
  },

  onError(err, req, res, next) {
    // res.status(500).render("500", {
    //   name: err.name,
    //   message: err.message,
    // });
    res.json({
      message: res
    });
  },
};
