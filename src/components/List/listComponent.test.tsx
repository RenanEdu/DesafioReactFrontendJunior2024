import { fireEvent, render } from "@testing-library/react";
import Props from "./ListComponent";
import { act } from "react-dom/test-utils";

describe("ListComponent", () => {
  it("should render", async () => {
    const props: Props = {
      tasks: [],
      onComplete: jest.fn(),
      onDelete: jest.fn(),
      onClearCompleted: jest.fn(),
    };
    const { getByTestId } = render(<ListComponent {...props} />);
    const list = getByTestId("list");
    expect(list).toBeInTheDocument();
  });
  it("should render items", async () => {
    const props: Props = {
      tasks: [
        {
          id: "id-test",
          title: "test",
          isDone: false,
        },
      ],
      onComplete: jest.fn(),
      onDelete: jest.fn(),
      onClearCompleted: jest.fn(),
    };
    const { getAllByTestId } = render(<ListComponent {...props} />);
    const listItems = getAllByTestId("list-item");
    expect(listItems[0]).toBeInTheDocument();
  });
  it("should check completed", async () => {
    const props: typeof Props = {
      tasks: [
        {
          id: "id-test",
          title: "test",
          isDone: false,
        },
      ],
      onComplete: jest.fn(),
      onDelete: jest.fn(),
      onClearCompleted: jest.fn(),
    };
    const { getAllByTestId } = render(<ListComponent {...props} />);
    const listItemsInput = getAllByTestId(
      "list-item--input-checkbox"
    ) as HTMLInputElement[];
    await act(async () => {
      fireEvent(
        listItemsInput[0],
        new Event("change", {
          bubbles: true,
        })
      );
    });
    expect(props.onComplete).toHaveBeenCalled();
    expect(props.onComplete).toHaveBeenCalledWith("aksdksadk");
  });
  //   it("should change input value and checkbox", async () => {
  //     const props: Props = {
  //       onSubmit: jest.fn(),
  //       onChange: jest.fn(),
  //       initialValue: "",
  //       listLength: 0,
  //     };
  //     const { getByTestId, queryByTestId, getByText } = render(
  //       <ListComponent {...props} />
  //     );
  //     const inputCheckbox = queryByTestId("input--checkbox");
  //     const inputText = getByTestId("input--text") as HTMLInputElement;
  //     expect(inputCheckbox).not.toBeInTheDocument();
  //     expect(inputText.value).toEqual("");
  //     fireEvent.change(inputText, { target: { value: "Changed Input" } });
  //     expect(props.onChange).toHaveBeenCalled();
  //     expect(props.onChange).toHaveBeenCalledWith("Changed Input");
  //   });
  //   it("should submit task", async () => {
  //     const props: Props = {
  //       onSubmit: jest.fn(),
  //       onChange: jest.fn(),
  //       initialValue: "",
  //       listLength: 0,
  //     };
  //     const { getByTestId } = render(<ListComponent {...props} />);
  //     const inputText = getByTestId("input--text") as HTMLInputElement;
  //     fireEvent.keyDown(inputText, { key: "Esc" });
  //     expect(props.onSubmit).not.toHaveBeenCalled();
  //     act(() => {
  //       inputText.value = "Changed Input";
  //     });
  //     fireEvent.keyDown(inputText, { key: "Enter" });
  //     expect(props.onSubmit).toHaveBeenCalledWith("Changed Input");
  //   });
});
