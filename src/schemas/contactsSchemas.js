import Joi from "joi";

export const createContactSchema = Joi.object({
  name: Joi.string().min(3).max(20).required().messages({
    "string.base": "Contact name must be a string",
    "string.min": "Contact name must be at least {#limit} characters",
    "string.max": "Contact name must be no more than {#limit} characters",
    "any.required": "Contact name is required",
  }),
  phone: Joi.string().min(3).max(20).required().messages({
    "string.base": "Phone number should be a string",
    "string.min": "Phone number should be at least {#limit} characters",
    "string.max": "Phone number should be no more than {#limit} characters",
    "any.required": "Phone number is required",
  }),
  email: Joi.string()
    .email({ tlds: { deny: ["ru"] } })
    .messages({
      "string.email": "Please enter valid email",
    }),
});

export const updateContactSchema = Joi.object({
  name: Joi.string().min(3).max(20).messages({
    "string.base": "Contact name must be a string",
    "string.min": "Contact name must be at least {#limit} characters",
    "string.max": "Contact name must be no more than {#limit} characters",
  }),
  phone: Joi.string().min(3).max(20).messages({
    "string.base": "Phone number should be a string",
    "string.min": "Phone number should be at least {#limit} characters",
    "string.max": "Phone number should be no more than {#limit} characters",
  }),
  email: Joi.string()
    .email({ tlds: { deny: ["ru"] } })
    .messages({
      "string.email": "Please enter valid email",
    }),
})
  .min(1)
  .messages({
    "object.min": "Body must have at least one field",
  });

export const updateStatusContactSchema = Joi.object({
  favorite: Joi.boolean().required().messages({
    "boolean.base": "Favorite must be a boolean",
    "any.required": "Favorite status is required",
  }),
});
