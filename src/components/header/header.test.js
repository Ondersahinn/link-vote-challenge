import { render as rtlRender, screen, cleanup, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux'
import store from 'redux/store';
import Header from './index';
import { MemoryRouter } from 'react-router-dom';

afterEach(() => {
    cleanup();
})
const render = component => rtlRender(
    <Provider store={store}>
        {component}
    </Provider>
)

const snapShot = '<div class="header-normal-part"><a href="/"><svg>logo.svg</svg></a><h1><span>Link</span>VOTE Challenge</h1></div>'

describe('With React Testing Library', () => {


    test('Modal', () => {
        render(<MemoryRouter><Header /></MemoryRouter>)
    
        const header = screen.getByTestId('header-test');
        expect(header).toBeInTheDocument();
        expect(header).toHaveTextContent('Link');
        expect(header).toContainHTML(snapShot);
        fireEvent.click(screen.getByText('logo.svg'));
        expect(true).toBeTruthy();
    })


})