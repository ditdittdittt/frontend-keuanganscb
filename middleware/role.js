export default ({ store, route, redirect }) => {
  const user = store.$auth.$state.user
  switch (route.name) {
    case 'management-user':
      if (
        !(
          user.roles_list.includes('admin') ||
          user.roles_list.includes('head_office')
        )
      ) {
        redirect('/login')
      }
      break
    case 'management-bank':
      if (
        !(
          user.roles_list.includes('admin') ||
          user.roles_list.includes('head_office')
        )
      ) {
        redirect('/login')
      }
      break
    case 'management-budget':
      if (
        !(
          user.roles_list.includes('admin') ||
          user.roles_list.includes('head_office') ||
          user.roles_list.includes('head_dept') ||
          user.roles_list.includes('manager_ops')
        )
      ) {
        redirect('/login')
      }
      break
    default:
      redirect('/login')
  }
}
