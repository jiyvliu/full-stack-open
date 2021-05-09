import React from 'react'

const Notification = ({ message }) => {
  const notificationStyle = {
    color: 'green',
    background: 'lightgray',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  if (message === null) {
    return null
  }

  return (
    <div style={notificationStyle}>
      {message}
    </div>
  )

}

const ErrorNotification = ({ errorMessage }) => {
  const errorNotificationStyle = {
    color: 'red',
    background: 'lightgray',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  if (errorMessage === null) {
    return null
  }

  return (
    <div style={errorNotificationStyle}>
      {errorMessage}
    </div>
  )

}

const Notifications = {
  Notification,
  ErrorNotification
}

export default Notifications