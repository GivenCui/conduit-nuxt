/**
 * 未登录时的中间件
 */
export default function (context) {
    // 上下文对象
    const { store, redirect } = context

    console.log('unauthenticated 中间件 运行了')

    // If the user is not authenticated
    if (store.state.user) {
      return redirect('/')  // 原理是 302 ??
    }
  }
  