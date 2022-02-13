import { render as rtlRender, screen, cleanup, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux'
import store from 'redux/store';
import LinkList from './index';

const render = component => rtlRender(
    <Provider store={store}>
        {component}
    </Provider>
)

afterEach(() => {
    cleanup();
})


describe('With React Testing Library', () => {

    it("should close modal", () => {
        store.dispatch = jest.fn()
       
    });
    test('LinkList', () => {
       render(<LinkList />)
        const linkList = screen.getByTestId('linklist-test');
        const voteIncButton = screen.getByTestId('vote-inc-button-0');
        const voteDescButton = screen.getByTestId('vote-desc-button-0');
        fireEvent.click(voteIncButton)
        fireEvent.click(voteDescButton)
        expect(linkList).toBeInTheDocument();
    })
})