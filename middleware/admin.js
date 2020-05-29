export default function ({ store, redirect }) {
  if (store.state.auth.user.rol !== 'ADMIN') {
    return redirect('/')
  }
}
