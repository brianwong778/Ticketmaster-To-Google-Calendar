const User = ({user}) => {
    return (
      <li className='user'>
        {user.firstName} {user.lastName}
      </li>
    )
  }

export default User
