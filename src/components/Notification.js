import React from 'react'
import { connect } from 'react-redux'

// SUI components
import { Message, Header, TransitionablePortal, Segment } from 'semantic-ui-react'

const Notification = ({ notification }) => {
if (notification.style === 'notification-success') {
  return (
    <TransitionablePortal open={notification.open} transition={{ animation: 'slide down'}}>
      <Message success style={{ right: '5%', position: 'fixed', top: '0%', zIndex: 1000 }} >
        <Message.Header>{notification.message}</Message.Header>
      </Message>
    </TransitionablePortal>
  )
} else {
  return (
    <TransitionablePortal open={notification.open} transition={{ animation: 'slide down'}}>
      <Message error style={{ right: '5%', position: 'fixed', top: '0%', zIndex: 1000 }} >
        <Message.Header>{notification.message}</Message.Header>
      </Message>
    </TransitionablePortal>
  )
}



  //TODO fix this, ugly as f**k but compatible with current implementation
  // if (notification.message === '') {
  //   return (
  //       <Message hidden >
  //       <Message.Header hidden></Message.Header>
  //       </Message>
  //     )
  // } else if (notification.style === 'notification-success') {
  //   return (
  //       <Message  success >
  //         <Message.Header>{notification.message}</Message.Header>
  //       </Message>
  //   )
  // } else if (notification.style === 'notification-error') {
  //   return (
  //       <Message  negative >
  //         <Message.Header>{notification.message}</Message.Header>
  //       </Message>
  //   )
  // }


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
