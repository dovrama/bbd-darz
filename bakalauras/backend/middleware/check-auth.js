const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, "secret_code_kuris_apsaugo_mano_appsa_ir_neleidzia_nulauzti_visko_in_your_Face_hackers_lol");
    next();
  } catch (error) {
    res.status(401).json({ message: "Auth failed!" });
  }
};
