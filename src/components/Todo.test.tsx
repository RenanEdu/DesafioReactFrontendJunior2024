impport { render } from "@testing-library/react";
import TodoComponent from "./Todo";

describe('TodoComponent', ()=> {
    it('should render component', async ()=> {
        const { getByTestId, getBytext } = render(<TodoComponent />);
        const component = getByTestId('todo--root')

        const title = getByText(/todos/)
        expect(component).toBeInTheDocument();
        expect(title).toBeInTheDocument();
    });
});