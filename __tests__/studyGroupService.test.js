import { jest } from "@jest/globals";

const mockGetAll = jest.fn();
const mockCreate = jest.fn();
jest.unstable_mockModule(
    "../repositories/studyGroupRepository.js",
    () => ({
        getAll: mockGetAll,
        create: mockCreate
    })
);

const {createGroup} = await import("../services/studyGroupService.js");

test("rejects missing subject", async () => {
    const result = await createGroup({
        subject: "",
        time: "Monday 5 PM",
        place: "ILC",
        capacity: 5
    });
    expect(result.ok).toBe(false);
});

test("rejects whitespace subject", async () => {
    const result = await createGroup({
        subject: "     ",
        time: "Monday 5 PM",
        place: "ILC",
        capacity: 5
    });
    expect(result.ok).toBe(false);
});

test("rejects non-numeric capacity", async () => {
    const result = await createGroup({
        subject: "Math",
        time: "Monday 5 PM",
        place: "ILC",
        capacity: "banana"
    });
    expect(result.ok).toBe(false);
});

test("rejects negative capacity", async () => {
    const result = await createGroup({
        subject: "Math",
        time: "Monday 5 PM",
        place: "ILC",
        capacity: -2
    });
    expect(result.ok).toBe(false);
});

test("rejects zero capacity", async () => {
    const result = await createGroup({
        subject: "Math",
        time: "Monday 5 PM",
        place: "ILC",
        capacity: 0
    });
    expect(result.ok).toBe(false);
});

test("creates a valid study group", async () => {
    mockCreate.mockResolvedValue({
        subject: "Math",
        time: "Monday 5 PM",
        place: "ILC",
        capacity: 5
    });
    const result = await createGroup({
        subject: "Math",
        time: "Monday 5 PM",
        place: "ILC",
        capacity: 5
    });
    expect(result.ok).toBe(true);
    expect(mockCreate).toHaveBeenCalled();
});