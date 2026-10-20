const isProd = process.env.NODE_ENV === 'production'

const cookieBase = {
    httpOnly: true,
    secure: true,
    sameSite: isProd ? 'none' : 'lax',
    path: '/'
}

export default cookieBase