import { jest } from "@jest/globals";

const mockGetAll = jest.fn();
const mockCreate = jest.fn();
const mockFindById = jest.fn();
const mockRemoveById = jest.fn();
jest.unstable_mockModule(
    "../repositories/studyGroupRepository.js",
    () => ({
        getAll: mockGetAll,
        create: mockCreate,
        findById: mockFindById,
        removeById: mockRemoveById
    })
);

const {createGroup, removeGroup} = await import("../services/studyGroupService.js");

beforeEach(() =>{
    jest.clearAllMocks();
})
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
    }, {id: "1", role:"member"});
    expect(result.ok).toBe(true);
    expect(mockCreate).toHaveBeenCalled();
});

test("returns 404 when deleting a group that does not exist", async ()=>{
    mockFindById.mockResolvedValue(null);
    const res = await removeGroup("1", {id: "1", role:"member"});
    expect(res.ok).toBe(false);
    expect(res.error.status).toBe(404);
    expect(mockRemoveById).not.toHaveBeenCalled();
});

test("deletes an existing group", async ()=> {
    mockFindById.mockResolvedValue({_id: "1", ownerId: "1", subject: "Math"});
    const res = await removeGroup("1", {id:"1", role:"member"});
    expect(res.ok).toBe(true);
    expect(mockRemoveById).toHaveBeenCalled()
})

test("returns 403 when a non owner tries to delete", async ()=>{
    mockFindById.mockResolvedValue({_id: "1", ownerId: "owner-1"});
    const res = await removeGroup("1", {id: "someone-else", role:"member"});
    expect(res.ok).toBe(false);
    expect(res.error.status).toBe(403);
    expect(mockRemoveById).not.toHaveBeenCalled();
});

test("lets an admin delete someone else's group", async ()=>{
    mockFindById.mockResolvedValue({_id: "1", subject: "Math"});
    const res = await removeGroup("1", {id: "someone-else", role: "admin"});
    expect(res.ok).toBe(true)
    expect(mockRemoveById).toHaveBeenCalled();
})
