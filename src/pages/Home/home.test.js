import { render as rtlRender, screen, cleanup } from '@testing-library/react';
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


describe('With React Testing Library', () => {


    test('Header', () => {
        render(<MemoryRouter><Header /></MemoryRouter>)
    
        const header = screen.getByTestId('home-test');
        expect(header).toBeInTheDocument();
        expect(true).toBeTruthy();
    })


})