import React from 'react'
import ReactDOM from 'react-dom'
import jsdom from 'mocha-jsdom'
import { act } from 'react-dom/test-utils'
import { expect } from 'chai'
import { simulate, shallow, mount } from 'enzyme'
import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import Welcome from '../src/welcome.js'
import MochaTest from '../src/mochaTest.js'

Enzyme.configure({ adapter: new Adapter() })

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

describe('testing mochaTest', () => {
    it('should render button with text', () => {
        // act(() => {
        //     ReactDOM.render(<MochaTest />, tempDiv)
        // })
        // let button = tempDiv.querySelector('button')
        const wrapper = mount(<MochaTest />);
        const button = wrapper.find('.button');
        // const wrapper = shallow(<MochaTest />)
        // wrapper.find('button').at(0).simulate('click')
        console.log(button)
        expect(MochaTest.prototype.handleClick).to.have.property('callCount', 1);
    })
})