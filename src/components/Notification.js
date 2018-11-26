import React from 'react'
import { connect } from 'react-redux'

// SUI components
import { Message } from 'semantic-ui-react'

const Notification = ({ notification }) => {
  //TODO fix this, ugly as f**k but compatible with current implementation

  if (notification.message === '') {
    return (
        <Message hidden >
        <Message.Header hidden></Message.Header>
        </Message>
      )
  } else if (notification.style === 'notification-success') {
    return (
        <Message attached success >
          <Message.Header>{notification.message}</Message.Header>
        </Message>
    )
  } else if (notification.style === 'notification-error') {
    return (
        <Message attached negative >
          <Message.Header>{notification.message}</Message.Header>
        </Message>
    )
  }
  // return (
  //   <div className={notification.style}>
  //     {notification.message}
  //   </div>
  // )
  // return (
  //   <div className={'notifications'}>
  //     <Message negative>
  //       <Message.Header>{notification.message}</Message.Header>
  //     </Message>
  //   </div>
  // )

}

const mapStateToProps = (state) => {
  return {
    notification: state.notification
  }
}

export default connect(
  mapStateToProps,
  null
  // mapDispatchToProps
)(Notification)
