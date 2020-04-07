import ItemComponent from "../components/Item";
import { shallow } from "enzyme";
import toJSON from "enzyme-to-json";

const fakeItem = {
  id: "ABC123",
  title: "A cool item",
  price: 4000,
  description: "cool description",
  image: "dog.jpg",
  largeImage: "largedog.jpg",
};

describe("<Item />", () => {
  it("renders and matchse the snapshot", () => {
    const wrapper = shallow(<ItemComponent item={fakeItem} />);
    expect(toJSON(wrapper)).toMatchSnapshot();
    // const price = "$50.34";
    // expect(price).toMatchSnapshot();
  });
  // it("renders the image properly", () => {
  //   const wrapper = shallow(<ItemComponent item={fakeItem} />);
  //   const img = wrapper.find("img");
  //   expect(img.props().src).toBe(fakeItem.image);
  //   expect(img.props().alt).toBe(fakeItem.title);
  // });
  // it("renders the price tag and title properly", () => {
  //   const wrapper = shallow(<ItemComponent item={fakeItem} />);
  //   const PriceTag = wrapper.find("PriceTag");
  //   expect(PriceTag.children().text()).toBe("$50");
  //   expect(wrapper.find("Title a").text()).toBe(fakeItem.title);
  // });
  // it("renders out the buttons properly", () => {
  //   const wrapper = shallow(<ItemComponent item={fakeItem} />);
  //   const ButtonList = wrapper.find(".buttonList");
  //   expect(ButtonList.children()).toHaveLength(3);
  //   console.log(ButtonList.debug());
  //   expect(ButtonList.find("Link")).toHaveLength(1);
  //   expect(ButtonList.find("Link").exists()).toBe(true);
  //   expect(ButtonList.find("AddToCart").exists()).toBe(true);
  //   expect(ButtonList.find("DeleteItem").exists()).toBe(true);
  // });
});
