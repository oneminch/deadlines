import Joi from 'joi'

export const deadlineItemSchema = Joi.object({
  id: Joi.string().min(1).max(100).required(),
  task: Joi.string().min(1).max(100).required(),
  date: Joi.date().required(),
})
