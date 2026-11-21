const db = require('../../src/persistence');
const getItemsCount = require('../../src/routes/getItemsCount');

jest.mock('../../src/persistence', () => ({
    getItemsCount: jest.fn(),
}));

test('it returns zero when the store is empty', async () => {
    const req = {};
    const res = { send: jest.fn() };
    db.getItemsCount.mockReturnValue(Promise.resolve(0));

    await getItemsCount(req, res);

    expect(db.getItemsCount.mock.calls.length).toBe(1);
    expect(res.send.mock.calls[0][0]).toEqual({ count: 0 });
});

test('it returns the count reported by the persistence layer', async () => {
    const req = {};
    const res = { send: jest.fn() };
    db.getItemsCount.mockReturnValue(Promise.resolve(2));

    await getItemsCount(req, res);

    expect(res.send.mock.calls[0][0]).toEqual({ count: 2 });
});
