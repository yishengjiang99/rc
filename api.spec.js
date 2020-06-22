const r = require("describe");
const dev = require('describe');
const {default: Axios} = require("axios");
const defaultGet = axios.create({
    headers:[`Authorization: token ${req.queries.access_token}`]
})
describe("page apis eqach contain email", (function(){
    it("github call first  github repo for user", () =>
            {
                const repos = defaultGet("https://api.github.com/me/repos")
            });
        
    })
})
