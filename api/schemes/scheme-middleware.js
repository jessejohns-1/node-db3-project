const Scheme = require("./scheme-model");

const checkSchemeId = async (req, res, next) => {
  try {
    const scheme_id = await Scheme.findById(req.params.id);
    if (!scheme_id) {
      next({
        status: 404,
        message: `scheme with scheme_id ${req.params.id} not found`,
      });
    } else {
      req.scheme_id = scheme_id;
      next();
    }
  } catch (err) {
    next(err);
  }
};

/*
  If `scheme_name` is missing, empty string or not a string:

  status 400
  {
    "message": "invalid scheme_name"
  }
*/
const validateScheme = (req, res, next) => {
  const scheme_name = req.body;
  if (
    scheme_name === undefined ||
    typeof scheme_name !== "string"||
    scheme_name === ""
  ) {
    next({ status: 400, message: `invalid scheme_name` });
  } else {
    req.body.scheme_name = scheme_name.trim();
  }
};

/*
  If `instructions` is missing, empty string or not a string, or
  if `step_number` is not a number or is smaller than one:

  status 400
  {
    "message": "invalid step"
  }
*/
const validateStep = (req, res, next) => {
  const { instructions, step_number } = req.body;
  if (
    instructions === undefined ||
    instructions === ""||
    typeof instructions !== "string" ||
    typeof step_number !== "number" ||
    step_number === isNaN() ||
    step_number < 1
  ) {
    next({ status: 400, message: "invalid step" });
  } else {
    next();
  }
};

module.exports = {
  checkSchemeId,
  validateScheme,
  validateStep,
};
