import { render as rtlRender, screen, cleanup, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux'
import store from 'redux/store';
import Modal from './index';

const render = component => rtlRender(
    <Provider store={store}>
        {component}
    </Provider>
)

afterEach(() => {
    cleanup();
})

const snapShot = '<div class="modal-box"><div class="modal-info"><div class="header"><h4>Test</h4><span data-testid="onCancelButton"><svg>Close.svg</svg></span></div><div class="modal-body"><span>Test</span></div></div></div>'

describe('With React Testing Library', () => {
    test('Modal', () => {
        render(<Modal visible={true} title='Test' children={<span>Test</span>} />)
        const modalElement = screen.getByTestId('modal-test');
        const clickIndicator = screen.getByTestId('onCancelButton')
        fireEvent.click(clickIndicator)
        expect(modalElement).toBeInTheDocument();
        expect(modalElement).toHaveTextContent('Test');
        expect(modalElement).toContainHTML(snapShot)
    })
})