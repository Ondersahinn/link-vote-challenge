import { render as rtlRender, screen, cleanup } from '@testing-library/react';
import { Provider } from 'react-redux'
import store from 'redux/store';
import Notification from './index';

const render = component => rtlRender(
    <Provider store={store}>
        {component}
    </Provider>
)

afterEach(() => {
    cleanup();
})

const htmlElement = '<div class="header"><h4>Test</h4></div>'

describe('With React Testing Library', () => {
    test('Notification',() => {
        render(<Notification visible={true} desc='Test' />)
        const notificationElement =  screen.getByTestId('notification-test');
        expect(notificationElement).toBeInTheDocument();
        expect(notificationElement).toHaveTextContent('Test');
        expect(notificationElement).toContainHTML(htmlElement)
    })
})