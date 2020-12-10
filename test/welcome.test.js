import React from 'react'
import ReactDOM from 'react-dom'
import jsdom from 'mocha-jsdom'
import { act } from 'react-dom/test-utils'
import { expect } from 'chai'
import Welcome from '../src/welcome.js'
import MochaTest from '../src/mochaTest.js'

global.document = jsdom({
    url: "http://localhost:3000"
})

let tempDiv

beforeEach(() => {
    tempDiv = document.createElement('div')
    document.body.appendChild(tempDiv)
})

afterEach(() => {
    document.body.removeChild(tempDiv)
    tempDiv = null
})

describe('testing welcome', () => {
    it('should render h1 with text Kool', () => {
        act(() => {
            ReactDOM.render(<Welcome />, tempDiv)
        })
        const h1 = tempDiv.querySelector('h1')
        expect(h1.textContent).to.equal('Kool')
    })
})

// describe('testing mochaTest', () => {
//     it('should render h1 with text testing', () => {
//         act(() => {
//             ReactDOM.render(<MochaTest />, tempDiv)
//         })
//         const div = tempDiv.querySelector('div')
//         expect(div.textContent).to.equal('testing')
//     })
// })