import React, { useState, useEffect } from 'react'
import { useForm, useFieldArray } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

import ServiceApi from '../../services/ServiceApi'
const NewArticle = () => {
  const navigate = useNavigate()
  const [errorServer, setErrorServer] = useState(false)
  const { userObj, isLogin } = useSelector((state) => state.auth)
  const { token } = userObj
  const serviceApi = new ServiceApi()
  errorServer && !isLogin ? navigate('/sign-in') : null

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors }
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      tagList: [{ nameTag: '' }]
    }
  })
  const { fields, append, remove } = useFieldArray({ control, name: 'tagList' })

  const onSubmit = (data) => {
    let filterArr = {
      ...data,
      tagList: data.tagList.length ? data.tagList.map((el) => el.nameTag) : []
    }
    serviceApi.createNewArticle(filterArr, token).then((res) => {
      if (res.article) {
        navigate(`/articles/${res.article.slug}`)
      }
      if (res.errors) {
        setErrorServer(true)
      }
    })
    reset()
  }

  return (
    <div className="article-wrapper">
      <div className="article-block-items">
        <div className="form-container form-new-article">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-wrapp">
              <h3>Create new article</h3>

              <label>Title</label>
              <input
                className={`form-input ${errors.title && 'input-error'}`}
                type="text"
                placeholder="Title"
                {...register('title', {
                  required: 'This field is required!'
                })}
              />
              {errors.title && (
                <p style={{ color: 'red', marginBottom: '0' }}>
                  {errors.title.message}
                </p>
              )}
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
              {errors.description && (
                <p style={{ color: 'red', marginBottom: '0' }}>
                  {errors.description.message}
                </p>
              )}
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
              {errors.body && (
                <p style={{ color: 'red', marginBottom: '0' }}>
                  {errors.body.message}
                </p>
              )}
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
            {errorServer && (
              <p style={{ color: 'red', marginBottom: '0' }}>
                Incorrect information.
              </p>
            )}
            <button
              className="form-btn btn-new-article"
              type="submit"
              name="submit"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
export default NewArticle
