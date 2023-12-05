import Joi from "joi";
import { pick } from "../helpers/pick";

const validate = (Schema) => (req, res, next) => {
  const validSchema = pick(Schema, ["params", "query", "body"]);

  const object = pick(req, Object.keys(validSchema));

  const { value, error } = Joi.compile(validSchema)
    .prefs({ errors: { label: "key" }, abortEarly: false })
    .validate(object);

  if (error) {
    const errorMessage = error.details
      .map((details) => details.message)
      .join(", ");
    return res.status(400).json({
      status: false,
      message: errorMessage,
    });
  }

  Object.assign(req, value);
  return next();
};

export default validate;
