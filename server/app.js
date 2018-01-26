const Koa = require('koa')
const Router = require('koa-router')
const axios = require('axios')

const app = new Koa()
const router = new Router()

function getJson(url) {
    return axios.get(url)
        .then((res) => {
            return res;
        })
        .catch((err) => {
            console.log(err)
        })
}

router.get('/', async(ctx) => {
    const data = await getJson('https://api.github.com/repos/xypisces/Front-end-blog/issues')
        //console.log(data.data)
    ctx.body = {
        messgae: 'hello world!!xuyu',
        data: data.data,
        status: data.status,
        headers: data.headers,
        text: data.statusText,
    }
})

app.use(router.routes()).use(router.allowedMethods())

app.listen(3333, () => {
    console.log('app is starting at 3333')
})