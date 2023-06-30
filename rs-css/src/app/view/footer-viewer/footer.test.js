import FooterViewerView from "./footer-viewer-view";
import { expect, test } from "@jest";

test("instanceOfclass", () => {
  expect(new FooterViewerView()).toBeInstanceOf(FooterViewerView);
});
