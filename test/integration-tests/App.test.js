const App = require('../../src/App')
const client = require('axios')
const expect = require('chai').expect

const { oneDoubleConfig } = require('../doubler.config')
describe('App', () => {
    afterEach(() => {
        app.stop()
    })
    const app = new App;
    it('returns status 200 when hitting registered endpoint', () => {
        const url = 'http://localhost:8001/some-other-example'
        app.run(oneDoubleConfig)

        return client.get(url)
            .then(response => expect(response).to.have.property('status',200))


    })
    it('returns status 404 when hitting not registered endpoint', () => {
        const url = 'http://localhost:8001/not-registered'
        app.run(oneDoubleConfig)

        return client.get(url)
            .catch(err => {

               return expect(err.response).to.have.property('status',404)
            })
    })
})