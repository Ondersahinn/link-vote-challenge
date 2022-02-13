import { render as rtlRender, screen, cleanup, fireEvent } from '@testing-library/react';
import Pagination from 'components/pagination';
import { Provider } from 'react-redux'
import store from 'redux/store';

const render = component => rtlRender(
    <Provider store={store}>
        {component}
    </Provider>
)

afterEach(() => {
    cleanup();
})

describe('With React Testing Library', () => {
    test('pagination',() => {
        render(<Pagination total={10} pageSize={5} pageIndex={2} />)
        const paginationElement =  screen.getByTestId('pagination-test');
        const paginationIncButton =  screen.getByTestId('pagination-inc');
        const paginationDescButton =  screen.getByTestId('pagination-desc');
        fireEvent.click(paginationIncButton);
        fireEvent.click(paginationDescButton);
        expect(paginationElement).toBeInTheDocument();
        expect(paginationElement).toHaveTextContent('1');
        expect(paginationElement).toHaveTextContent('2');
    })
    
    
})