/**
 * 验证是否登录的中间件
 */
export default function (context) {
    // 上下文对象
    const { store, redirect } = context

    console.log('authenticated 中间件 运行了')

    // If the user is not authenticated
    if (!store.state.user) {
      return redirect('/login')  // 原理是 302 ??
    }
  }
  