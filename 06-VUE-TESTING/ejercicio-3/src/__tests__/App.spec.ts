import { beforeEach, describe, expect, it, vi } from "vitest";
import { flushPromises, mount } from "@vue/test-utils";

import App from "../App.vue";

vi.mock("../services/userService", () => ({
  getUsers: vi.fn().mockResolvedValue([{ id: 1, name: "Ana" }]),
}));

describe("App", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("muestra el listado de usuarios al montar", async () => {
    const wrapper = mount(App);

    await flushPromises();

    expect(wrapper.text()).toContain("Listado de usuarios");
    expect(wrapper.text()).toContain("Ana");
  });
});
