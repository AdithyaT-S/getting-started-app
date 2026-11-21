const db = require('../../src/persistence');
const getItemCount = require('../../src/routes/getItemCount');

jest.mock('../../src/persistence', () => ({
    getItemCount: jest.fn(),
}));

test('it returns a count of 0 when there are no items', async () => {
    const req = {};
    const res = { send: jest.fn() };
    db.getItemCount.mockReturnValue(Promise.resolve(0));

    await getItemCount(req, res);

    expect(db.getItemCount.mock.calls.length).toBe(1);
    expect(res.send.mock.calls[0][0]).toEqual({ count: 0 });
});

test('it returns the count reported by the persistence layer', async () => {
    const req = {};
    const res = { send: jest.fn() };
    db.getItemCount.mockReturnValue(Promise.resolve(2));

    await getItemCount(req, res);

    expect(res.send.mock.calls[0][0]).toEqual({ count: 2 });
});
