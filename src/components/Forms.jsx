import React, { createContext, useContext } from 'react'
const Context = createContext(null)

function Form ({ children, ...props }) {
  const atributes = {
    method: props.method
  }

  const sendForm = (e) => {
    if (e.key === 'Enter') props.fetchDataListado(e)
  }

  return (
    <form {...atributes} onSubmit={(e) => props.fetchDataListado(e) } onKeyDown={!props.noEnter && sendForm} >
      {props.data
        ? <Context.Provider value={props.data}>
          {children}
        </Context.Provider>
        : children
      }
    </form>
  )
}

// si data contiene una key con el mismo nombre que props name esta pasa a convertirse en el default value del input
function Input (props) {
  const data = useContext(Context)

// si se encuentran 
  let defaultValue
  if (data) defaultValue = Object.keys(data).includes(props.name) ? data[props.name] : undefined

  let label, name
  if (props.name) name = props.name[0].toUpperCase() + props.name.substring(1)
  if (props.label) label = props.label[0].toUpperCase() + props.label.substring(1)

  const hayLabel = !props.noLabel && (props.name || props.label)

  props = {
    id: props.name,
    defaultValue,
    ...props,
    'data-nova-required': props.required
  }
  return (
    <>
    {hayLabel 
      ? <label htmlFor={props.name} > {label || name}: <input {...props}></input> </label>
      : <input {...props}></input> }
    </>
  )
}

function Button ({ children, ...props }) {
  if (props.fetch || props.acction) {
    const buttonAcction = props.fetch || props.acction
    return (
      <button onClick={(e) => {
        e.preventDefault()
        buttonAcction()
      }}> {children} </button>
    )
  }
}

export { Form, Input, Button }
