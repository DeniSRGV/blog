import React, { useState, useEffect } from 'react'
import { useForm, useFieldArray } from 'react-hook-form'

import ErrorMessage from '../ErrorMessage/ErrorMessage'
const NewArticle = ({ onSubmitArt, article }) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors }
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      ...article,
      tagList: [article.tagList.map((tag) => ({ nameTag: tag }))]
    }
  })
  const { fields, append, remove } = useFieldArray({ control, name: 'tagList' })

  const onSubmit = (data) => {
    let filterArr = {
      ...data,
      tagList: data.tagList.length ? data.tagList.map((el) => el.nameTag) : []
    }

    onSubmitArt(filterArr)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-wrapp">
        <label>Title</label>
        <input
          className={`form-input ${errors.title && 'input-error'}`}
          type="text"
          placeholder="Title"
          {...register('title', {
            required: 'This field is required!'
          })}
        />
        <ErrorMessage errors={errors} type={'title'} />
      </div>
      <div className="form-wrapp">
        <label>Short description</label>
        <input
          className={`form-input ${errors.description && 'input-error'}`}
          type="text"
          placeholder="Title"
          {...register('description', {
            required: 'This field is required!'
          })}
        />
        <ErrorMessage errors={errors} type={'description'} />
      </div>
      <div className="form-wrapp">
        <label>Text</label>
        <textarea
          className={`form-input form-input-text ${
            errors.body && 'input-error'
          }`}
          type="text"
          placeholder="Text"
          {...register('body', {
            required: 'This field is required!'
          })}
        ></textarea>
        <ErrorMessage errors={errors} type={'body'} />
      </div>
      <div className="tag-container">
        <div className="tag-block">
          {fields.map((item, index) => {
            return (
              <li key={item.id}>
                <input
                  className="form-input form-input-tag"
                  type="text"
                  placeholder="Tag"
                  {...register(`tagList.${index}.nameTag`)}
                />
                <button
                  className="btn-md"
                  type="button"
                  onClick={() => remove(index)}
                >
                  Delete
                </button>
              </li>
            )
          })}
        </div>
        <button
          className="btn-md btn-md-blue"
          type="button"
          onClick={() => append({ name: '' })}
        >
          Add Tag
        </button>
      </div>

      <button className="form-btn btn-new-article" type="submit" name="submit">
        Send
      </button>
    </form>
  )
}
export default NewArticle
